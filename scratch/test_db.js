
const { MongoClient } = require('mongodb');

async function test() {
    const client = new MongoClient(process.env.MONGODB_URI);    
    try {
        await client.connect();
        const db = client.db(); // Default DB
        console.log("Using DB:", db.databaseName);
        const rooms = await db.collection('rooms').find({}).toArray();
        console.log("Room count:", rooms.length);
        if (rooms.length > 0) {
            console.log("Sample room:", rooms[0].roomName);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

test();
