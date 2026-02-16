'use client'

import React, { useState } from 'react';
interface Room {
  id: string;
  name: string;
  x: number;


  y: number;
  width: number;
  height: number;
  color: string;
  isStair?: boolean;
}
function Firstfloor() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const rooms = [
    // Top row - 1st Floor
    { id: 'cl9', name: 'CL 9', x: 20, y: 20, width: 80, height: 70, color: '#f3e5f5' },
    { id: 'placement-cell', name: 'T & P Cell', x: 110, y: 55, width: 60, height: 35, color: '#fff3e0' },
    { id: 'pharma-cell', name: 'HR Office', x: 110, y: 20, width: 60, height: 35, color: '#fff3e0' },
    { id: 'washroom-boys', name: 'BW', x: 180, y: 20, width: 50, height: 35, color: '#e0f2f1' },
    // Stair in front of BW
    { id: 'Stair-BW', name: 'Stair', x: 172, y: 56, width: 18, height: 35, color: '#d4af37', isStair: true },
    
    { id: 'cc-10-11', name: 'CL 10 & 11', x: 250, y: 10, width: 160, height: 37, color: '#f3e5f5' },
    { id: 'tr1', name: 'TR 1', x: 250, y: 50, width: 68, height: 35, color: '#e3f2fd' },
    { id: 'tr2', name: 'TR 2', x: 320, y: 50, width: 68, height: 35, color: '#e3f2fd' },
    
    { id: 'board-room', name: 'Board Room', x: 415, y: 13, width: 100, height: 37, color: '#f1f8e9' },
    { id: 'staff-room', name: 'Staff Room', x: 516, y: 14, width: 100, height: 37, color: '#fce4ec' },
    
    { id: 'tr3', name: 'TR 3', x: 510, y: 50, width: 53, height: 35, color: '#e3f2fd' },
    { id: 'tr4', name: 'TR 4', x: 565, y: 50, width: 53, height: 35, color: '#e3f2fd' },
    
    { id: 'lobby', name: 'Lobby', x: 620, y: 15, width: 58, height: 75, color: '#f0f4c3' },
    // Stair at Lobby
    { id: 'Stair-Lobby', name: 'Stair', x: 678, y: 15, width: 18, height: 75, color: '#d4af37', isStair: true },
    
    { id: 'cr9', name: 'CR 9', x: 700, y: 15, width: 90, height: 75, color: '#c8e6c9' },
    { id: 'cr10', name: 'CR 10', x: 790, y: 15, width: 90, height: 75, color: '#c8e6c9' },

    // Middle corridor area
    { id: 'corridor-top', name: 'Corridor', x: 20, y: 130, width: 840, height: 60, color: '#f5f5f5' },

    // Bottom section
    { id: 'lt3', name: 'LT 3', x: 20, y: 240, width: 100, height: 140, color: '#e1f5fe' },
    { id: 'cr8', name: 'CR 8', x: 200, y: 250, width: 80, height: 130, color: '#c8e6c9' },
    { id: 'cr7', name: 'CR 7', x: 290, y: 250, width: 80, height: 130, color: '#c8e6c9' },
    
    { id: 'cr6', name: 'CR 6', x: 460, y: 250, width: 80, height: 130, color: '#c8e6c9' },
    { id: 'cr5', name: 'CR 5', x: 550, y: 250, width: 80, height: 130, color: '#c8e6c9' },
    { id: 'gw', name: 'GW', x: 630, y: 310, width: 60, height: 70, color: '#e0f2f1' },
    
    { id: 'lab1', name: 'LAB 1', x: 690, y: 250, width: 80, height: 130, color: '#ffecb3' },
    { id: 'lab2', name: 'LAB 2', x: 780, y: 250, width: 80, height: 130, color: '#ffecb3' },
    
    // Mughal Garden area
    { id: 'mughal-garden', name: 'Mughal Garden', x: 20, y: 390, width: 840, height: 130, color: '#d4edda' },
  ];

  const getRoomColor = (room:Room) => {
    if (selectedRoom === room.id) {
      return '#ffd54f';
    }
    return room.color;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">First Floor Plan</h1>
          <p className="text-lg text-slate-600">EduNav Campus Navigation System</p>
        </div>

        {/* Main Container */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          {/* SVG Floor Plan */}
          <div className="flex justify-center">
            <svg viewBox="0 0 880 530" className="w-full border-2 border-slate-300 rounded-lg bg-white shadow-md" style={{ aspectRatio: '880/530' }}>
              {/* Background Pattern */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="880" height="530" fill="url(#grid)" />

              {/* Building outline */}
              <rect x="10" y="10" width="860" height="510" fill="none" stroke="#999" strokeWidth="2" strokeDasharray="10,5" opacity="0.5" />

              {/* Floor label */}
              <text x="440" y="35" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#666" opacity="0.4">
                1st Floor
              </text>

              {/* Render all rooms */}
              {rooms.map(room => {
                return (
                  <g key={room.id}>
                    {/* Room rectangle */}
                    <rect
                      x={room.x}
                      y={room.y}
                      width={room.width}
                      height={room.height}
                      fill={getRoomColor(room)}
                      stroke={selectedRoom === room.id ? '#ff6b6b' : '#475569'}
                      strokeWidth={selectedRoom === room.id ? '3' : '2'}
                      rx="3"
                      className="cursor-pointer transition-all duration-200 hover:opacity-80"
                      onClick={() => setSelectedRoom(selectedRoom === room.id ? null : room.id)}
                      style={{
                        filter: selectedRoom === room.id ? 'drop-shadow(0 0 8px rgba(255, 107, 107, 0.5))' : 'none'
                      }}
                    />

                    {/* Stair pattern (diagonal lines) */}
                    {room.isStair && (
                      <>
                        <line x1={room.x} y1={room.y} x2={room.x + room.width} y2={room.y + room.height} stroke="#8b7500" strokeWidth="1" opacity="0.3" />
                        <line x1={room.x + room.width} y1={room.y} x2={room.x} y2={room.y + room.height} stroke="#8b7500" strokeWidth="1" opacity="0.3" />
                        <line x1={room.x + room.width/2} y1={room.y} x2={room.x + room.width/2} y2={room.y + room.height} stroke="#8b7500" strokeWidth="1" opacity="0.3" />
                      </>
                    )}

                    {/* Room label */}
                    {room.name && (
                      <text
                        x={room.x + room.width / 2}
                        y={room.y + room.height / 2}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="font-bold select-none"
                        fontSize={room.width < 80 ? '10' : '12'}
                        fill="#1f2937"
                        pointerEvents="none"
                      >
                        {room.name}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Border lines for reference */}
              <line x1="10" y1="10" x2="870" y2="10" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="10" y1="520" x2="870" y2="520" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="10" y1="10" x2="10" y2="520" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="870" y1="10" x2="870" y2="520" stroke="#cbd5e1" strokeWidth="1" />
            </svg>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Legend</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {rooms.map(room => (
              <div
                key={room.id}
                className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 cursor-pointer hover:border-slate-400 transition-all"
                onClick={() => setSelectedRoom(selectedRoom === room.id ? null : room.id)}
              >
                <div
                  className="w-5 h-5 rounded border border-slate-400 flex-shrink-0"
                  style={{ backgroundColor: room.color }}
                />
                <span className="text-sm font-medium text-slate-700 truncate">{room.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Room Details Panel */}
        {selectedRoom && (
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Room Details</h2>
            {rooms.map(room => {
              if (room.id === selectedRoom) {
                return (
                  <div key={room.id} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded border-2 border-slate-300"
                        style={{ backgroundColor: room.color }}
                      />
                      <p><span className="font-bold text-slate-700">Name:</span> <span className="text-slate-600 text-lg">{room.name}</span></p>
                    </div>
                    {room.isStair && (
                      <p className="text-amber-700 bg-amber-50 p-3 rounded-lg mt-3">
                        <span className="font-semibold">⚠️ Emergency Exit:</span> This is a staircase connecting multiple floors.
                      </p>
                    )}
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-slate-500">
          <p>Last updated: February 2026 | Interactive Floor Plan</p>
        </div>
      </div>
    </div>
  );
}

export default Firstfloor;