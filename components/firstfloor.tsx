'use client'

import React from 'react';

function Firstfloor() {
  // Rooms based on your updated floor plan
  const rooms = [
    // Top row - 1st Floor
    { id: 'hr-office', name: 'HR Office', x: 20, y: 20, width: 80, height: 70 },
    { id: 'pharma-cell', name: 'Pharma Cell', x: 110, y: 20, width: 90, height: 70 },
    { id: 'washroom-boys', name: 'Washroom Boys', x: 210, y: 20, width: 70, height: 35 },
    { id: 'washroom-2', name: '', x: 210, y: 60, width: 70, height: 30 },
    { id: 'cc-11', name: 'CC-11', x: 290, y: 20, width: 110, height: 70 },
    { id: 'cc-12', name: 'CC-12', x: 410, y: 20, width: 90, height: 70 },
    { id: 'staff-room', name: 'Staff Room', x: 510, y: 20, width: 80, height: 40 },
    { id: 'cse-rm-b', name: 'CSE RM B', x: 510, y: 65, width: 80, height: 25 },
    { id: 'lobby', name: 'Lobby', x: 600, y: 20, width: 60, height: 70 },
    { id: 'ca-9', name: 'CA 9', x: 670, y: 20, width: 90, height: 70 },
    { id: 'ca-10', name: 'CA 10', x: 770, y: 20, width: 90, height: 70 },

    // Middle corridor area
    { id: 'corridor-top', name: '', x: 20, y: 100, width: 840, height: 60 },

    // Bottom section - Ground Floor area
    { id: 'ca-sno', name: 'CA SNO', x: 20, y: 170, width: 100, height: 90 },
    { id: 'lt3', name: 'LT3', x: 20, y: 270, width: 60, height: 130 },
    { id: 'ca-8', name: 'CA 8', x: 130, y: 170, width: 110, height: 80 },
    { id: 'ca-7', name: 'CA 7', x: 250, y: 170, width: 90, height: 80 },
    { id: 'ca-6', name: 'CA 6', x: 350, y: 170, width: 90, height: 80 },
    
    // Mughal Garden area
    { id: 'mughal-garden', name: 'Mughal Garden', x: 130, y: 260, width: 310, height: 140 },
    
    // Right side bottom
    { id: 'corridor-right', name: '', x: 450, y: 170, width: 60, height: 230 },
    { id: 'ramps-lab', name: 'Ramps Lab', x: 520, y: 170, width: 90, height: 100 },
    { id: 'see-lab', name: 'SEE LAB', x: 520, y: 280, width: 90, height: 120 },
    { id: 'passage', name: '', x: 620, y: 170, width: 50, height: 230 },
    { id: 'way-to-green', name: 'Way to Mughal Green →', x: 680, y: 170, width: 180, height: 230 },

    // Side labels
    { id: 'lt4-label', name: 'LT4', x: 20, y: 410, width: 60, height: 40 },
  ];

  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full h-full p-6 overflow-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Campus Floor Plan</h1>
        
        <div className="bg-gray-50 rounded-lg p-4 h-[calc(100%-80px)]">
          <svg viewBox="0 0 880 460" className="w-full h-full">
            {/* Building outline */}
            <rect x="10" y="10" width="860" height="440" fill="none" stroke="#999" strokeWidth="3" strokeDasharray="10,5" />
            
            {/* Floor labels */}
            <text x="440" y="110" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#666" opacity="0.5">
              1st Floor
            </text>
            <text x="440" y="310" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#666" opacity="0.5">
              Ground Floor
            </text>
            
            {/* Render all rooms */}
            {rooms.map(room => {
              const isGarden = room.id === 'mughal-garden';
              const isCorridor = room.id.includes('corridor') || room.id === 'passage' || room.id === 'lobby';
              const isWayPath = room.id === 'way-to-green';
              
              return (
                <g key={room.id}>
                  <rect
                    x={room.x}
                    y={room.y}
                    width={room.width}
                    height={room.height}
                    fill={isGarden ? '#d4edda' : isCorridor ? '#f8f9fa' : isWayPath ? '#fff3cd' : '#ffffff'}
                    stroke="#333"
                    strokeWidth="2"
                    rx="3"
                  />
                  {room.name && (
                    <text
                      x={room.x + room.width / 2}
                      y={room.y + room.height / 2}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fontSize={room.width < 80 ? '10' : '12'}
                      fontWeight={isGarden ? 'normal' : 'bold'}
                      fill="#333"
                      style={{ fontStyle: isGarden ? 'italic' : 'normal' }}
                    >
                      {room.name}
                    </text>
                  )}
                </g>
              );
            })}
            
            {/* Stairway markers */}
            <rect x="600" y="30" width="15" height="50" fill="#666" stroke="#333" strokeWidth="1" />
            <text x="607" y="55" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="bold">
              ↕
            </text>
            
          </svg>
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-500">
          EduNav Campus Navigation System
        </div>
      </div>
    </div>
  );
}

export default Firstfloor;