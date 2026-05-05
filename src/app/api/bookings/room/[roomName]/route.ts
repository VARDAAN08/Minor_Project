import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ roomName: string }> }
) {
  try {
    const { roomName } = await params;
    const db = await getDb();
    
    const bookings = await db.collection('bookings')
      .find({ classroomName: roomName })
      .sort({ date: 1, startTime: 1 })
      .toArray();
      
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching room bookings:', error);
    return NextResponse.json({ error: 'Failed to fetch bookings' }, { status: 500 });
  }
}
