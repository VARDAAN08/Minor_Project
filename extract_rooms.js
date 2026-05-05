const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');

const floorMap = {
  'MinusOneFloor.tsx': -1,
  'FloorGround.tsx': 0,
  'firstfloor.tsx': 1,
  'SecondFloor.tsx': 2,
  'thirdfloor.tsx': 3,
  'fourthfloor.tsx': 4
};

const allRooms = [];

for (const [file, floor] of Object.entries(floorMap)) {
  const filePath = path.join(componentsDir, file);
  if (!fs.existsSync(filePath)) continue;
  
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  for (const line of lines) {
    if (line.includes('clickable: true')) {
      const idMatch = line.match(/id:\s*['"]([^'"]+)['"]/);
      if (idMatch) {
        allRooms.push({ roomName: idMatch[1], floor });
      }
    }
  }
}

console.log(JSON.stringify(allRooms, null, 2));
