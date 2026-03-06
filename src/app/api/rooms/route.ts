import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';

const DB = process.env.MONGODB_DB!;

// GET all rooms
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB);
    const rooms = await db.collection('rooms').find({}).toArray();
    return NextResponse.json(rooms);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch rooms' }, { status: 500 });
  }
}

// POST - add/update a room
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db(DB);
    const result = await db.collection('rooms').insertOne({
      ...body,
      createdAt: new Date(),
    });
    return NextResponse.json({ insertedId: result.insertedId }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save room' }, { status: 500 });
  }
}
