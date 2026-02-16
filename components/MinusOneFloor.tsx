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
function MinusOneFloor() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const rooms = [
    { id: 'Basement', name: 'Basement', x: 13, y: 328, width: 856, height: 200, color: '#e3f2fd' },
    { id: 'Corridor', name: 'Corridor', x: 20, y: 27, width: 770, height: 170, color: '#e8f4f8' },
    { id: 'Library', name: 'Library -1', x: 319, y: 239, width: 345, height: 90, color: '#f3e5f5' },
    { id: 'Tuck shop', name: 'Tuck shop', x: 665, y: 239, width: 200, height: 90, color: '#fff3e0' },
    { id: 'CR 1', name: 'CR 1', x: 15, y: 239, width: 150, height: 90, color: '#f1f8e9' },
    { id: 'CR 2', name: 'CR 2', x: 168, y: 239, width: 150, height: 90, color: '#f1f8e9' },
    { id: 'Stair', name: 'Stair', x: 790, y: 27, width: 79, height: 170, color: '#d4af37' },
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
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Basement (-1) Floor Plan</h1>
          <p className="text-lg text-slate-600">EduNav Campus Navigation System</p>
        </div>

        {/* Main Container */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          {/* SVG Floor Plan */}
          <div className="flex justify-center">
            <svg width="900" height="600" className="border-2 border-slate-300 rounded-lg bg-white shadow-md">
              {/* Background */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="900" height="600" fill="url(#grid)" />

              {/* Render rooms */}
              {rooms.map(room => {
                const isStair = room.id === 'Stair';
                const isCorridor = room.id === 'Corridor';

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
                      rx="4"
                      className="cursor-pointer transition-all duration-200 hover:opacity-80"
                      onClick={() => setSelectedRoom(selectedRoom === room.id ? null : room.id)}
                      style={{
                        filter: selectedRoom === room.id ? 'drop-shadow(0 0 8px rgba(255, 107, 107, 0.5))' : 'none'
                      }}
                    />

                    {/* Stair pattern (diagonal lines) */}
                    {isStair && (
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
                        fontSize="14"
                        fill="#1f2937"
                        pointerEvents="none"
                      >
                        {room.name}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Grid lines for reference */}
              <line x1="0" y1="0" x2="900" y2="0" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="0" y1="600" x2="900" y2="600" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="0" y1="0" x2="0" y2="600" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="900" y1="0" x2="900" y2="600" stroke="#cbd5e1" strokeWidth="1" />
            </svg>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Legend</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {rooms.map(room => (
              <div
                key={room.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 cursor-pointer hover:border-slate-400 transition-all"
                onClick={() => setSelectedRoom(selectedRoom === room.id ? null : room.id)}
              >
                <div
                  className="w-6 h-6 rounded border border-slate-400"
                  style={{ backgroundColor: room.color }}
                />
                <span className="text-sm font-medium text-slate-700">{room.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Room Details */}
        {selectedRoom && (
          <div className="bg-white rounded-lg shadow-lg p-6 mt-6 border-l-4 border-red-500">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Room Details</h2>
            {rooms.map(room => {
              if (room.id === selectedRoom) {
                return (
                  <div key={room.id} className="space-y-2">
                    <p><span className="font-bold text-slate-700">Name:</span> <span className="text-slate-600">{room.name}</span></p>
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MinusOneFloor;