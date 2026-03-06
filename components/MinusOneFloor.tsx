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
  clickable?: boolean;
}
function MinusOneFloor() {
  const [selectedRooms, setSelectedRooms] = useState<Set<string>>(new Set());

  const rooms: Room[] = [
    { id: 'Basement', name: 'Basement', x: 13, y: 328, width: 856, height: 200, color: '#e3f2fd', clickable: false },
    { id: 'Corridor', name: 'Corridor', x: 20, y: 27, width: 770, height: 170, color: '#e8f4f8', clickable: false },
    { id: 'Library', name: 'Library -1', x: 319, y: 239, width: 345, height: 90, color: '#f3e5f5', clickable: false },
    { id: 'Tuck shop', name: 'Tuck shop', x: 665, y: 239, width: 200, height: 90, color: '#fff3e0', clickable: false },
    { id: 'CR 1', name: 'CR 1', x: 15, y: 239, width: 150, height: 90, color: '#f1f8e9', clickable: true },
    { id: 'CR 2', name: 'CR 2', x: 168, y: 239, width: 150, height: 90, color: '#f1f8e9', clickable: true },
    { id: 'Stair', name: 'Stair', x: 790, y: 27, width: 79, height: 170, color: '#d4af37', clickable: false },
  ];

  const getRoomColor = (room: Room) =>
    room.clickable && selectedRooms.has(room.id) ? '#ffd54f' : room.color;

  const handleRoomClick = (room: Room) => {
    if (!room.clickable) return;
    const newSelected = new Set(selectedRooms);
    if (newSelected.has(room.id)) {
      newSelected.delete(room.id);
    } else {
      newSelected.add(room.id);
    }
    setSelectedRooms(newSelected);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Basement (-1) Floor Plan</h1>
          <p className="text-lg text-slate-600">EduNav Campus Navigation System</p>
        </div>

        {/* SVG Floor Plan */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-center">
            <svg width="900" height="600" className="border-2 border-slate-300 rounded-lg bg-white shadow-md">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="900" height="600" fill="url(#grid)" />

              {rooms.map(room => {
                const isStair = room.id === 'Stair';
                const isSelected = room.clickable && selectedRooms.has(room.id);
                return (
                  <g key={room.id} onClick={() => handleRoomClick(room)} className={room.clickable ? 'cursor-pointer' : 'cursor-default'}>
                    <rect
                      x={room.x} y={room.y}
                      width={room.width} height={room.height}
                      fill={getRoomColor(room)}
                      stroke={isSelected ? '#ef4444' : '#475569'}
                      strokeWidth={isSelected ? 3 : 1.5}
                      rx="4"
                      className={`transition-all duration-200 ${room.clickable ? 'hover:opacity-80' : ''}`}
                      style={{ filter: isSelected ? 'drop-shadow(0 0 8px rgba(239,68,68,0.5))' : 'none' }}
                    />
                    {isStair && (
                      <>
                        <line x1={room.x} y1={room.y} x2={room.x + room.width} y2={room.y + room.height} stroke="#8b7500" strokeWidth="1" opacity="0.3" />
                        <line x1={room.x + room.width} y1={room.y} x2={room.x} y2={room.y + room.height} stroke="#8b7500" strokeWidth="1" opacity="0.3" />
                        <line x1={room.x + room.width/2} y1={room.y} x2={room.x + room.width/2} y2={room.y + room.height} stroke="#8b7500" strokeWidth="1" opacity="0.3" />
                      </>
                    )}
                    {room.name && (
                      <text
                        x={room.x + room.width / 2}
                        y={room.y + room.height / 2}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="14"
                        fontWeight="600"
                        fill="#1f2937"
                        pointerEvents="none"
                        className="select-none"
                      >
                        {room.name}
                      </text>
                    )}
                    {room.clickable && (
                      <circle
                        cx={room.x + room.width - 10}
                        cy={room.y + 10}
                        r="5"
                        fill="#4caf50"
                        opacity="0.9"
                        pointerEvents="none"
                      />
                    )}
                  </g>
                );
              })}

              <line x1="0" y1="0" x2="900" y2="0" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="0" y1="600" x2="900" y2="600" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="0" y1="0" x2="0" y2="600" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="900" y1="0" x2="900" y2="600" stroke="#cbd5e1" strokeWidth="1" />
            </svg>
          </div>
        </div>

        {/* Selected Rooms Details — same as First Floor */}
        {selectedRooms.size > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-l-4 border-red-500">
            <h2 className="text-xl font-bold text-slate-800 mb-3">Selected Rooms ({selectedRooms.size})</h2>
            <div className="space-y-2">
              {rooms.filter(r => selectedRooms.has(r.id)).map(room => (
                <div key={room.id} className="flex items-center gap-3 p-2 bg-slate-50 rounded">
                  <div className="w-6 h-6 rounded border-2 border-slate-300" style={{ backgroundColor: room.color }} />
                  <p className="text-sm">
                    <span className="font-bold text-slate-700">{room.name}</span>
                    {room.isStair && <span className="text-amber-600 ml-2">⚠️ Stair</span>}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Legend</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {rooms.map(room => (
              <div
                key={room.id}
                onClick={() => handleRoomClick(room)}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                  room.clickable
                    ? selectedRooms.has(room.id)
                      ? 'border-red-400 bg-red-50 cursor-pointer'
                      : 'border-green-300 hover:border-green-500 cursor-pointer'
                    : 'border-slate-200 cursor-default opacity-60'
                }`}
              >
                <div className="w-6 h-6 rounded border border-slate-400" style={{ backgroundColor: room.color }} />
                <span className="text-sm font-medium text-slate-700">{room.name}</span>
                {room.clickable && <span className="ml-auto text-xs text-green-600 font-semibold">●</span>}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-slate-500 flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
            Green dot indicates clickable rooms (CR 1 & CR 2)
          </p>
        </div>

        <div className="mt-6 text-center text-sm text-slate-500">
          Last updated: February 2026 | Interactive Floor Plan
        </div>
      </div>
    </div>
  );
}

export default MinusOneFloor;