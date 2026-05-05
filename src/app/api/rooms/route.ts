export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { updateAllRoomsOccupancy } from '@/lib/occupancy';

export async function GET() {
  try {
    const db = await getDb();
    
    // Refresh all room occupancy statuses to ensure they are up to date with IST time
    await updateAllRoomsOccupancy();
    
    const rooms = await db.collection('rooms').find({}).toArray();
    
    return NextResponse.json(rooms, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
  }
}

