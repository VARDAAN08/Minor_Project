export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { getDb } from '@/lib/mongodb';
import { updateRoomOccupancy } from '@/lib/occupancy';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const db = await getDb();
    const rooms = await db.collection('rooms').find({}).toArray();
    
    let updatedCount = 0;
    for (const room of rooms) {
      await updateRoomOccupancy(room.roomName);
      updatedCount++;
    }
    
    return NextResponse.json({ updated: updatedCount });
  } catch (error) {
    console.error('Cron error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

