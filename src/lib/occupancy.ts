import { getDb } from './mongodb';

export async function updateRoomOccupancy(roomName: string) {
  const db = await getDb();
  
  // Escape regex characters but preserve spaces for exact matching
  const escapedRoomName = roomName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  
  // Create current date in IST (+5:30)
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istTime = new Date(now.getTime() + istOffset);
  
  // Get IST date at midnight UTC for comparison with stored booking dates
  const istDateString = istTime.toISOString().split('T')[0];
  const todayMidnight = new Date(istDateString + 'T00:00:00.000Z');
  
  // Current time in HH:MM format (IST)
  const currentTime = istTime.toISOString().split('T')[1].slice(0, 5); // "HH:MM"

  // Search for active bookings using case-insensitive regex for the normalized name
  const activeBooking = await db.collection('bookings').findOne({
    classroomName: { $regex: new RegExp(`^${escapedRoomName}$`, 'i') },
    date: todayMidnight,
    startTime: { $lte: currentTime },
    endTime: { $gt: currentTime },
    status: { $in: ['pending', 'approved'] },
  });

  // Update the room's occupied status. We update both by the original name and normalized name to be safe.
  await db.collection('rooms').updateMany(
    { roomName: { $regex: new RegExp(`^${escapedRoomName}$`, 'i') } },
    { $set: { occupied: !!activeBooking } }
  );
}

export async function updateAllRoomsOccupancy() {
  const db = await getDb();
  
  // Create current date in IST (+5:30)
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  const istTime = new Date(now.getTime() + istOffset);
  
  // Get IST date at midnight UTC for comparison with stored booking dates
  const istDateString = istTime.toISOString().split('T')[0];
  const todayMidnight = new Date(istDateString + 'T00:00:00.000Z');
  
  // Current time in HH:MM format (IST)
  const currentTime = istTime.toISOString().split('T')[1].slice(0, 5); // "HH:MM"

  // 1. Get all active bookings right now
  const activeBookings = await db.collection('bookings').find({
    date: todayMidnight,
    startTime: { $lte: currentTime },
    endTime: { $gt: currentTime },
    status: { $in: ['pending', 'approved'] },
  }).toArray();

  const occupiedRoomNames = activeBookings.map(b => b.classroomName);

  // 2. Perform a bulk update
  // First, set all rooms to unoccupied
  await db.collection('rooms').updateMany({}, { $set: { occupied: false } });
  
  // Then, set only the occupied ones to true
  if (occupiedRoomNames.length > 0) {
    const regexes = occupiedRoomNames.map(name => new RegExp(`^${name.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}$`, 'i'));
    await db.collection('rooms').updateMany(
      { roomName: { $in: regexes } },
      { $set: { occupied: true } }
    );
  }
}

