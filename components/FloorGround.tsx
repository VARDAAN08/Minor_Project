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
function FloorGround() {
  const [selectedRooms, setSelectedRooms] = useState<Set<string>>(new Set());

  const rooms: Room[] = [
    { id: 'Adm. off.', name: 'Adm. off.', x: 120, y: 13, width: 70, height: 90, color: '#fff3e0', clickable: false },
    { id: 'Lift', name: 'Lift', x: 207, y: 14, width: 45, height: 20, color: '#ede7f6', clickable: false },
    { id: 'BW', name: 'BW', x: 255, y: 14, width: 38, height: 29, color: '#e0f2f1', clickable: false },
    { id: 'Gw', name: 'Gw', x: 255, y: 47, width: 38, height: 29, color: '#e0f2f1', clickable: false },
    { id: 'LT 2', name: 'LT 2', x: 313, y: 14, width: 100, height: 110, color: '#f3e5f5', clickable: true },
    { id: 'DLC', name: 'DLC', x: 516, y: 14, width: 100, height: 110, color: '#e3f2fd', clickable: true },
    { id: 'Library', name: 'Library', x: 415, y: 13, width: 100, height: 50, color: '#f1f8e9', clickable: false },
    { id: 'Saraswati ma', name: 'Saraswati ma', x: 415, y: 230, width: 100, height: 50, color: '#fce4ec', clickable: false },
  { id: 'Lobby', name: 'Lobby', x: 620, y: 15, width: 58, height: 110, color: '#f0f4c3', clickable: false },
    { id: 'cr 3', name: 'cr 3', x: 777, y: 250, width: 90, height: 130, color: '#c8e6c9', clickable: true },
    { id: 'cr 4', name: 'cr 4', x: 680, y: 250, width: 90, height: 130, color: '#c8e6c9', clickable: true },
    { id: 'Lab', name: 'Lab', x: 680, y: 15, width: 90, height: 110, color: '#ffecb3', clickable: true },
    { id: 'Adm. cell', name: 'Adm. cell', x: 775, y: 17, width: 88, height: 130, color: '#f8bbd0', clickable: false },
    { id: 'corridor-top', name: 'Corridor', x: 20, y: 149, width: 845, height: 90, color: '#f5f5f5', clickable: false },
    { id: 'Audi', name: 'Audi', x: 15, y: 15, width: 100, height: 388, color: '#e1f5fe', clickable: true },
    { id: 'mughal-garden', name: 'Mughal Garden', x: 16, y: 390, width: 855, height: 130, color: '#d4edda', clickable: true },
    { id: 'Stair-LT2', name: 'Stair', x: 295, y: 14, width: 18, height: 110, color: '#d4af37', isStair: true, clickable: false },
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
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Ground Floor Plan</h1>
          <p className="text-lg text-slate-600">EduNav Campus Navigation System</p>
        </div>

        {/* SVG Floor Plan */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-center">
            <svg viewBox="0 0 880 530" className="w-full border-2 border-slate-300 rounded-lg bg-white shadow-md" style={{ aspectRatio: '880/530' }}>
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="880" height="530" fill="url(#grid)" />
              <rect x="10" y="10" width="860" height="510" fill="none" stroke="#999" strokeWidth="2" strokeDasharray="10,5" opacity="0.5" />
              <text x="440" y="35" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#666" opacity="0.4">
                Ground Floor
              </text>

              {rooms.map(room => {
                const isSelected = room.clickable && selectedRooms.has(room.id);
                return (
                  <g key={room.id} onClick={() => handleRoomClick(room)} className={room.clickable ? 'cursor-pointer' : 'cursor-default'}>
                    <rect
                      x={room.x} y={room.y}
                      width={room.width} height={room.height}
                      fill={getRoomColor(room)}
                      stroke={isSelected ? '#ef4444' : '#475569'}
                      strokeWidth={isSelected ? 3 : 1.5}
                      rx="3"
                      className={`transition-all duration-200 ${room.clickable ? 'hover:opacity-80' : ''}`}
                      style={{ filter: isSelected ? 'drop-shadow(0 0 8px rgba(239,68,68,0.5))' : 'none' }}
                    />
                    {room.isStair && (
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
                        fontSize={room.width < 80 ? '10' : '12'}
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
                        cx={room.x + room.width - 8}
                        cy={room.y + 8}
                        r="4"
                        fill="#4caf50"
                        opacity="0.9"
                        pointerEvents="none"
                      />
                    )}
                  </g>
                );
              })}

              <line x1="10" y1="10" x2="870" y2="10" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="10" y1="520" x2="870" y2="520" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="10" y1="10" x2="10" y2="520" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="870" y1="10" x2="870" y2="520" stroke="#cbd5e1" strokeWidth="1" />
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
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Legend</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {rooms.map(room => (
              <div
                key={room.id}
                onClick={() => handleRoomClick(room)}
                className={`flex items-center gap-2 p-2 rounded-lg border transition-all ${
                  room.clickable
                    ? selectedRooms.has(room.id)
                      ? 'border-red-400 bg-red-50 cursor-pointer'
                      : 'border-green-300 hover:border-green-500 cursor-pointer'
                    : 'border-slate-200 cursor-default opacity-50'
                }`}
              >
                <div className="w-5 h-5 rounded border border-slate-400 flex-shrink-0" style={{ backgroundColor: room.color }} />
                <span className="text-sm font-medium text-slate-700 truncate">{room.name}</span>
                {room.clickable && <span className="ml-auto text-green-500 text-xs">●</span>}
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-slate-500 flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
            Green dot indicates clickable rooms
          </p>
        </div>

        <div className="mt-6 text-center text-sm text-slate-500">
          Last updated: February 2026 | Interactive Floor Plan
        </div>
      </div>
    </div>
  );
}

export default FloorGround;