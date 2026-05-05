const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const uri = process.env.MONGODB_URI;

const roomsToSeed = [
  { roomName: 'CR 1', floor: -1 },
  { roomName: 'CR 2', floor: -1 },
  { roomName: 'LT 2', floor: 0 },
  { roomName: 'DLC', floor: 0 },
  { roomName: 'cr 3', floor: 0 },
  { roomName: 'cr 4', floor: 0 },
  { roomName: 'CL8', floor: 0 },
  { roomName: 'Audi', floor: 0 },
  { roomName: 'mughal-garden', floor: 0 },
  { roomName: 'cl9', floor: 1 },
  { roomName: 'hr-office', floor: 1 },
  { roomName: 'placement-cell', floor: 1 },
  { roomName: 'washroom-boys', floor: 1 },
  { roomName: 'cl10-11', floor: 1 },
  { roomName: 'tr1', floor: 1 },
  { roomName: 'tr2', floor: 1 },
  { roomName: 'board-room', floor: 1 },
  { roomName: 'staff-room', floor: 1 },
  { roomName: 'tr3', floor: 1 },
  { roomName: 'tr4', floor: 1 },
  { roomName: 'cr9', floor: 1 },
  { roomName: 'cr10', floor: 1 },
  { roomName: 'lt3', floor: 1 },
  { roomName: 'cr8', floor: 1 },
  { roomName: 'cr7', floor: 1 },
  { roomName: 'cr6', floor: 1 },
  { roomName: 'cr5', floor: 1 },
  { roomName: 'lab1', floor: 1 },
  { roomName: 'lab2', floor: 1 },
  { roomName: 'DBT', floor: 2 },
  { roomName: 'block-1', floor: 2 },
  { roomName: 'STAFF ROOM', floor: 2 },
  { roomName: 'block-3', floor: 2 },
  { roomName: 'cr11', floor: 2 },
  { roomName: 'cr12', floor: 2 },
  { roomName: 'cif', floor: 2 },
  { roomName: 'lt3', floor: 2 },
  { roomName: 'TR6', floor: 2 },
  { roomName: 'cr8', floor: 2 },
  { roomName: 'RR', floor: 2 },
  { roomName: 'cr7', floor: 2 },
  { roomName: 'ECE LAB4', floor: 2 },
  { roomName: 'SRS', floor: 2 },
  { roomName: 'ECE LAB5', floor: 2 },
  { roomName: 'ECE LAB1', floor: 2 },
  { roomName: 'lab1', floor: 2 },
  { roomName: 'server-room', floor: 2 },
  { roomName: 'cl1', floor: 2 },
  { roomName: 'Food Lab', floor: 3 },
  { roomName: 'Physics Lab2', floor: 3 },
  { roomName: 'Robotics Lab', floor: 3 },
  { roomName: 'Mac lab', floor: 3 },
  { roomName: 'ECE Lab-9', floor: 3 },
  { roomName: 'ECE Lab-8', floor: 3 },
  { roomName: 'BI project lab', floor: 3 },
  { roomName: 'GD Room', floor: 3 },
  { roomName: 'Language Lab', floor: 3 },
  { roomName: 'TR-5', floor: 3 },
  { roomName: 'CL6', floor: 3 },
  { roomName: 'CL5', floor: 3 },
  { roomName: 'CL4', floor: 3 },
  { roomName: 'CL3', floor: 3 },
  { roomName: 'CR-16', floor: 4 },
  { roomName: 'CR-17', floor: 4 },
  { roomName: 'CR-18', floor: 4 },
  { roomName: 'CR-19', floor: 4 },
  { roomName: 'DBT lab', floor: 4 },
  { roomName: 'Green house', floor: 4 }
];


async function seed() {
  if (!uri) {
    console.error('MONGODB_URI not found in .env.local');
    process.exit(1);
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();
    
    console.log('Seeding rooms...');
    
    for (const room of roomsToSeed) {
      await db.collection('rooms').updateOne(
        { roomName: room.roomName },
        { 
          $set: { 
            floor: room.floor,
            occupied: false,
            capacity: null
          } 
        },
        { upsert: true }
      );
    }
    
    // Create indexes
    await db.collection('rooms').createIndex({ roomName: 1 }, { unique: true });
    await db.collection('rooms').createIndex({ floor: 1 });
    await db.collection('bookings').createIndex({ classroomName: 1, date: 1, startTime: 1, endTime: 1 });

    console.log('Seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
  }
}

seed();
