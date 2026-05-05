export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { z } from 'zod';
import { updateRoomOccupancy } from '@/lib/occupancy';

const bookingSchema = z.object({
  classroomName: z.string().min(1),
  floor: z.number(),
  teacherName: z.string().min(2),
  teacherEmail: z.string().email(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  startTime: z.string().regex(/^\d{2}:\d{2}$/), // HH:MM
  endTime: z.string().regex(/^\d{2}:\d{2}$/), // HH:MM
  purpose: z.string().min(5),
}).refine((data) => data.endTime > data.startTime, {
  message: "End time must be after start time",
  path: ["endTime"],
});

export async function GET() {
  try {
    const db = await getDb();
    const bookings = await db.collection('bookings').find({}).sort({ date: -1, startTime: -1 }).toArray();
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate body
    const validation = bookingSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: validation.error.issues[0].message }, { status: 400 });
    }
    
    const data = validation.data;
    const parsedDate = new Date(data.date + 'T00:00:00Z'); // Store as midnight UTC
    const now = new Date();
    const istTime = new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
    const istDateString = istTime.toISOString().split('T')[0];
    const today = new Date(istDateString + 'T00:00:00Z');
    
    if (parsedDate < today) {
      return NextResponse.json({ error: 'Cannot book for a past date' }, { status: 400 });
    }
    
    const db = await getDb();
    
    // Check for overlap conflict
    const overlap = await db.collection('bookings').findOne({
      classroomName: data.classroomName,
      date: parsedDate,
      status: { $in: ['pending', 'approved'] },
      $nor: [
        { endTime: { $lte: data.startTime } },
        { startTime: { $gte: data.endTime } }
      ]
    });
    
    if (overlap) {
      return NextResponse.json({ error: 'This room is already booked for that time slot' }, { status: 409 });
    }
    
    // Insert booking
    const newBooking = {
      ...data,
      date: parsedDate,
      status: 'pending',
      createdAt: new Date(),
    };
    
    const result = await db.collection('bookings').insertOne(newBooking);
    
    // Update live occupancy
    await updateRoomOccupancy(data.classroomName);
    
    return NextResponse.json({ ...newBooking, _id: result.insertedId }, { status: 201 });
    
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

