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
function FloorGround() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const rooms = [
    { id: 'Adm. off.', name: 'Adm. off.', x: 120, y: 13, width: 70, height: 90, color: '#fff3e0' },
    { id: 'Lift', name: 'Lift', x: 207, y: 14, width: 45, height: 20, color: '#ede7f6' },
    { id: 'BW', name: 'BW', x: 255, y: 14, width: 38, height: 29, color: '#e0f2f1' },
    { id: 'Gw', name: 'Gw', x: 255, y: 47, width: 38, height: 29, color: '#e0f2f1' },
    { id: 'LT 2', name: 'LT 2', x: 313, y: 14, width: 100, height: 110, color: '#f3e5f5' },
    { id: 'DLC', name: 'DLC', x: 516, y: 14, width: 100, height: 110, color: '#e3f2fd' },
    { id: 'Library', name: 'Library', x: 415, y: 13, width: 100, height: 50, color: '#f1f8e9' },
    { id: 'Saraswati ma', name: 'Saraswati ma', x: 415, y: 230, width: 100, height: 50, color: '#fce4ec' },
    { id: 'Lobby', name: 'Lobby', x: 620, y: 15, width: 58, height: 110, color: '#f0f4c3' },
    { id: 'cr 3', name: 'cr 3', x: 777, y: 250, width: 90, height: 130, color: '#c8e6c9' },
    { id: 'cr 4', name: 'cr 4', x: 680, y: 250, width: 90, height: 130, color: '#c8e6c9' },
    { id: 'Lab', name: 'Lab', x: 680, y: 15, width: 90, height: 110, color: '#ffecb3' },
    { id: 'Adm. cell', name: 'Adm. cell', x: 775, y: 17, width: 88, height: 130, color: '#f8bbd0' },
    { id: 'corridor-top', name: 'Corridor', x: 20, y: 149, width: 845, height: 90, color: '#f5f5f5' },
    { id: 'Audi', name: 'Audi', x: 15, y: 15, width: 100, height: 388, color: '#e1f5fe' },
    { id: 'mughal-garden', name: 'Mughal Garden', x: 16, y: 390, width: 855, height: 130, color: '#d4edda' },
    // Stairs near LT 2
    { id: 'Stair-LT2', name: 'Stair', x: 295, y: 14, width: 18, height: 110, color: '#d4af37', isStair: true },
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
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Ground Floor Plan</h1>
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
                Ground Floor
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
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
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500 animate-fadeIn">
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

export default FloorGround;