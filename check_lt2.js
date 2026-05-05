const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

async function check() {
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const db = client.db();
  const room = await db.collection('rooms').findOne({ roomName: 'LT 2' });
  console.log('Room LT 2:', room);
  
  // also check active bookings for LT 2
  const bookings = await db.collection('bookings').find({ classroomName: 'LT 2' }).toArray();
  console.log('Bookings for LT 2:', bookings);
  
  await client.close();
}
check();
