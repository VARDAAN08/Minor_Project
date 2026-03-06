'use client'

import React from 'react';

function Firstfloor() {
  const rooms = [
    { id: 'cl9', name: 'CL 9', x: 20, y: 20, width: 80, height: 70 },
    { id: 'placement-cell', name: ' T & p cell', x: 110, y: 55, width: 60, height: 35},
    { id: 'pharma-cell', name: 'HR office', x: 110, y: 20, width: 60, height: 35 },
    { id: 'washroom-boys', name: 'BW', x: 180, y: 20, width: 50, height: 35 },
    { id: 'cc-11a', name: 'CL- 10 & 11', x: 250, y: 10, width: 160, height: 37 },
    { id: 'cc-11b', name: 'TR 1', x: 250, y: 50, width: 68, height: 35 },
    { id: 'cc-11c', name: 'TR 2', x: 320, y: 50, width: 68, height: 35 },
    { id: 'staff-room', name: 'Staff Room', x: 516, y: 14, width: 100, height: 37 },
    { id: 'board-room', name: 'Board Room', x: 415, y: 13, width: 100, height: 37 },
    { id: 'cc-11d', name: 'TR 4', x: 565, y: 50, width: 53, height: 35 },
    { id: 'cc-11e', name: 'TR 3', x: 510, y: 50, width: 53, height: 35 },
    { id: 'lobby', name: 'Lobby', x: 620, y: 15, width: 58, height: 75 },
    { id: 'ca-9', name: 'Cr 9', x: 680, y: 15, width: 90, height: 75 },
    { id: 'ca-10', name: 'Cr 10', x: 770, y: 15, width: 90, height: 75 },
    { id: 'corridor-top', name: '', x: 20, y: 130, width: 840, height: 60 },
    { id: 'lt3', name: 'LT3', x: 20, y: 240, width: 100, height: 140 },
    { id: 'ca-8', name: 'CR 8', x: 200, y: 250, width: 80, height: 130 },
    { id: 'ca-7', name: 'CR 7', x: 290, y: 250, width: 80, height: 130 },
    { id: 'lab1', name: 'LAB 1', x: 690, y: 250, width: 80, height: 130 },
    { id: 'lab2', name: 'LAB 2', x: 780, y: 250, width: 80, height: 130 },
    { id: 'mughal-garden', name: 'Mughal Garden', x: 20, y: 390, width: 840, height: 130 },
    { id: 'ramps-lab', name: 'CR 6', x: 460, y: 250, width: 80, height: 130},
    { id: 'see-lab', name: 'CR 5', x: 550, y: 250, width: 80, height: 130},
    { id: 'gw', name: 'GW', x: 630, y: 310, width: 60, height: 70},
  ];

  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center p-4">
      <style>{`
        @keyframes pulse-badge {
          0%, 100% { opacity: 1; transform: translate(-50%, -50%) rotate(-12deg) scale(1); }
          50% { opacity: 0.85; transform: translate(-50%, -50%) rotate(-12deg) scale(1.04); }
        }
        @keyframes stripe-scroll {
          0% { background-position: 0 0; }
          100% { background-position: 56px 0; }
        }
        .barricade-overlay {
          position: absolute;
          inset: 0;
          pointer-events: none;
          border-radius: 8px;
          overflow: hidden;
        }
        .barricade-stripes {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            45deg,
            rgba(255, 180, 0, 0.22) 0px,
            rgba(255, 180, 0, 0.22) 14px,
            rgba(0, 0, 0, 0.13) 14px,
            rgba(0, 0, 0, 0.13) 28px
          );
          animation: stripe-scroll 1.2s linear infinite;
        }
        .not-ready-badge {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-12deg);
          background: rgba(220, 30, 30, 0.92);
          color: #fff;
          font-family: 'Impact', 'Arial Black', sans-serif;
          font-size: 22px;
          font-weight: 900;
          letter-spacing: 2px;
          padding: 6px 14px;
          border-radius: 4px;
          border: 3px solid rgba(255,255,255,0.85);
          box-shadow: 0 4px 18px rgba(0,0,0,0.38), inset 0 1px 0 rgba(255,255,255,0.2);
          white-space: nowrap;
          text-shadow: 1px 1px 4px rgba(0,0,0,0.5);
          animation: pulse-badge 2s ease-in-out infinite;
          z-index: 10;
        }
      `}</style>

      <div className="bg-white rounded-lg shadow-2xl w-full h-full p-6 overflow-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Campus Floor Plan</h1>

        <div className="bg-gray-50 rounded-lg p-4 h-full" style={{ position: 'relative' }}>
          <svg viewBox="0 0 880 600" className="w-full h-full">
            {/* Building outline */}
            <rect x="10" y="10" width="860" height="520" fill="none" stroke="#999" strokeWidth="3" strokeDasharray="10,5" />

            {/* Floor label */}
            <text x="440" y="110" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#666" opacity="0.5">
              1st Floor
            </text>

            {/* Render all rooms */}
            {rooms.map((room, i) => {
              const isGarden = room.id === 'mughal-garden';
              const isCorridor = room.id.includes('corridor') || room.id === 'passage' || room.id === 'lobby';
              const isWayPath = room.id === 'way-to-green';

              return (
                <g key={`${room.id}-${i}`}>
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

            {/* Stairway marker */}
            <rect x="600" y="30" width="15" height="50" fill="#666" stroke="#333" strokeWidth="1" />
            <text x="607" y="55" textAnchor="middle" fontSize="8" fill="#fff" fontWeight="bold">↕</text>

            {/* ===== NOT READY BARRICADE OVERLAY ===== */}
            {/* Animated yellow/black diagonal stripes */}
            <defs>
              <pattern id="barricadeStripes" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <rect width="14" height="28" fill="rgba(255,185,0,0.25)" />
                <rect x="14" width="14" height="28" fill="rgba(0,0,0,0.12)" />
              </pattern>
              <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="3" stdDeviation="4" floodColor="rgba(0,0,0,0.45)" />
              </filter>
            </defs>

            {/* Full floor stripe wash */}
            <rect x="10" y="10" width="860" height="520" fill="url(#barricadeStripes)" rx="4" />

            {/* Semi-transparent red tint */}
            <rect x="10" y="10" width="860" height="520" fill="rgba(200,0,0,0.07)" rx="4" />

            {/* Central NOT READY badge — big, bold, rotated */}
            <g transform="translate(440, 270) rotate(-12)" filter="url(#badgeShadow)">
              {/* Badge background */}
              <rect x="-165" y="-38" width="330" height="76" rx="8" fill="rgba(210,20,20,0.93)" />
              {/* White border inset */}
              <rect x="-158" y="-31" width="316" height="62" rx="5" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="3" />
              {/* NOT READY text */}
              <text
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="44"
                fontWeight="900"
                fontFamily="Impact, Arial Black, sans-serif"
                fill="white"
                letterSpacing="4"
                style={{ textShadow: '2px 2px 6px rgba(0,0,0,0.5)' }}
              >
                NOT READY
              </text>
            </g>

            {/* Corner warning icons - top left */}
            <g transform="translate(30, 20)">
              <polygon points="14,0 28,24 0,24" fill="rgba(255,185,0,0.9)" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" />
              <text x="14" y="19" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#333">!</text>
            </g>
            {/* top right */}
            <g transform="translate(838, 20)">
              <polygon points="14,0 28,24 0,24" fill="rgba(255,185,0,0.9)" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" />
              <text x="14" y="19" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#333">!</text>
            </g>
            {/* bottom left */}
            <g transform="translate(30, 502)">
              <polygon points="14,0 28,24 0,24" fill="rgba(255,185,0,0.9)" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" />
              <text x="14" y="19" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#333">!</text>
            </g>
            {/* bottom right */}
            <g transform="translate(838, 502)">
              <polygon points="14,0 28,24 0,24" fill="rgba(255,185,0,0.9)" stroke="rgba(0,0,0,0.5)" strokeWidth="1.5" />
              <text x="14" y="19" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#333">!</text>
            </g>
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