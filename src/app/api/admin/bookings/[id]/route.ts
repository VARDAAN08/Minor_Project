export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { updateRoomOccupancy } from '@/lib/occupancy';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    if (!['approved', 'rejected', 'pending'].includes(body.status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }
    
    const db = await getDb();
    
    // Find booking
    const booking = await db.collection('bookings').findOne({ _id: new ObjectId(id) });
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }
    
    // Update status
    await db.collection('bookings').updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: body.status } }
    );
    
    // Recalculate room occupancy
    await updateRoomOccupancy(booking.classroomName);
    
    return NextResponse.json({ message: `Booking ${body.status} successfully` });
  } catch (error) {
    console.error('Error updating booking status:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
