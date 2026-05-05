const { MongoClient } = require('mongodb');

async function main() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db();
    const rooms = await db.collection('rooms').find({}).limit(10).toArray();
    console.log(JSON.stringify(rooms, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main();
