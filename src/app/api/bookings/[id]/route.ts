export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { updateRoomOccupancy } from '@/lib/occupancy';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await getDb();
    
    // Find the booking first to get the room name
    const booking = await db.collection('bookings').findOne({ _id: new ObjectId(id) });
    
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }
    
    const classroomName = booking.classroomName;
    
    // Delete the booking
    await db.collection('bookings').deleteOne({ _id: new ObjectId(id) });
    
    // Recalculate occupancy
    await updateRoomOccupancy(classroomName);
    
    return NextResponse.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
