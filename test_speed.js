const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const path = require('path');
const { updateAllRoomsOccupancy } = require('./src/lib/occupancy.ts');

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

async function check() {
  const start = Date.now();
  console.log('Starting updateAllRoomsOccupancy');
  
  // We need to compile TS, so we shouldn't use require directly unless ts-node is running it.
  // Actually, we can just fetch /api/rooms from localhost:3000 to see how long it takes.
}
check();
