const { MongoClient } = require('mongodb');

async function main() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/EduNav";
  const client = new MongoClient(uri);

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
