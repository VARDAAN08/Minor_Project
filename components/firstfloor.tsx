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
  fontSize?: number;
}

function Firstfloor() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const rooms: Room[] = [
    // ── TOP ROW ───────────────────────────────────────────────────────────
    { id: 'cl9',            name: 'CL 9',       x: 20,  y: 20, width: 80,  height: 70, color: '#f3e5f5' },
    { id: 'hr-office',      name: 'HR Office',  x: 110, y: 20, width: 60,  height: 35, color: '#fff3e0' },
    { id: 'placement-cell', name: 'T & P Cell', x: 110, y: 55, width: 60,  height: 35, color: '#fff3e0' },

    { id: 'washroom-boys',  name: 'BW',         x: 180, y: 20, width: 50,  height: 35, color: '#e0f2f1' },
    { id: 'washroom-girls', name: 'GW',         x: 180, y: 55, width: 32,  height: 35, color: '#fce4ec' },
    { id: 'stair-bw',       name: 'Stair',      x: 212, y: 55, width: 18,  height: 35, color: '#d4af37', isStair: true },

    { id: 'cl10-11',        name: 'CL 10 & 11', x: 250, y: 10, width: 160, height: 37, color: '#f3e5f5' },
    { id: 'tr1',            name: 'TR 1',        x: 250, y: 50, width: 68,  height: 35, color: '#e3f2fd' },
    { id: 'tr2',            name: 'TR 2',        x: 320, y: 50, width: 68,  height: 35, color: '#e3f2fd' },

    { id: 'board-room',     name: 'Board Room',  x: 415, y: 13, width: 100, height: 37, color: '#f1f8e9' },
    { id: 'staff-room',     name: 'Staff Room',  x: 516, y: 13, width: 100, height: 37, color: '#fce4ec' },

    { id: 'tr3',            name: 'TR 3',        x: 415, y: 50, width: 100, height: 35, color: '#e3f2fd' },
    { id: 'tr4',            name: 'TR 4',        x: 516, y: 50, width: 100, height: 35, color: '#e3f2fd' },

    { id: 'lobby',          name: 'Lobby',       x: 620, y: 13, width: 58,  height: 77, color: '#f0f4c3' },
    { id: 'stair-lobby',    name: 'Stair',       x: 678, y: 13, width: 18,  height: 77, color: '#d4af37', isStair: true },

    { id: 'cr9',            name: 'CR 9',        x: 700, y: 13, width: 90,  height: 77, color: '#c8e6c9' },
    { id: 'cr10',           name: 'CR 10',       x: 792, y: 13, width: 76,  height: 77, color: '#c8e6c9' },

    // ── CORRIDOR ─────────────────────────────────────────────────────────
    { id: 'corridor',       name: 'Corridor',    x: 20,  y: 100, width: 848, height: 50, color: '#f5f5f5' },

    // ── BOTTOM ROW ───────────────────────────────────────────────────────
    { id: 'lt3',            name: 'LT 3',        x: 20,  y: 160, width: 100, height: 140, color: '#e1f5fe' },
    { id: 'stair-lt3',      name: 'Stair',       x: 120, y: 160, width: 18,  height: 60,  color: '#d4af37', isStair: true },

    { id: 'cr8',            name: 'CR 8',        x: 200, y: 160, width: 80,  height: 140, color: '#c8e6c9' },
    { id: 'cr7',            name: 'CR 7',        x: 292, y: 160, width: 80,  height: 140, color: '#c8e6c9' },

    // gap (open space / connecting passage) between CR7 and CR6
    { id: 'passage',        name: 'Passage',     x: 374, y: 160, width: 74,  height: 140, color: '#fafafa' },

    { id: 'cr6',            name: 'CR 6',        x: 450, y: 160, width: 80,  height: 140, color: '#c8e6c9' },
    { id: 'cr5',            name: 'CR 5',        x: 542, y: 160, width: 80,  height: 140, color: '#c8e6c9' },
    { id: 'gw-bottom',      name: 'GW',          x: 634, y: 220, width: 44,  height: 80,  color: '#fce4ec' },

    { id: 'lab1',           name: 'LAB 1',       x: 690, y: 160, width: 90,  height: 140, color: '#ffecb3' },
    { id: 'lab2',           name: 'LAB 2',       x: 782, y: 160, width: 86,  height: 140, color: '#ffecb3' },

    // ── MUGHAL GARDEN ────────────────────────────────────────────────────
    { id: 'mughal-garden',  name: 'Mughal Garden', x: 20, y: 310, width: 848, height: 100, color: '#d4edda' },
  ];

  const getRoomColor = (room: Room) => selectedRoom === room.id ? '#ffd54f' : room.color;

  const handleClick = (id: string) =>
    setSelectedRoom(prev => (prev === id ? null : id));

  const selectedRoomData = rooms.find(r => r.id === selectedRoom);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">First Floor Plan</h1>
          <p className="text-lg text-slate-600">EduNav Campus Navigation System</p>
        </div>

        {/* SVG Floor Plan */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex justify-center">
            <svg
              viewBox="0 0 888 430"
              className="w-full border-2 border-slate-300 rounded-lg bg-white shadow-md"
              style={{ aspectRatio: '888/430' }}
            >
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="888" height="430" fill="url(#grid)" />
              <rect x="10" y="5" width="868" height="418" fill="none" stroke="#999" strokeWidth="2" strokeDasharray="10,5" opacity="0.5" />

              <text x="444" y="28" textAnchor="middle" fontSize="16" fontWeight="bold" fill="#666" opacity="0.35">
                1st Floor
              </text>

              {rooms.map(room => (
                <g key={room.id} onClick={() => handleClick(room.id)} className="cursor-pointer">
                  <rect
                    x={room.x} y={room.y}
                    width={room.width} height={room.height}
                    fill={getRoomColor(room)}
                    stroke={selectedRoom === room.id ? '#ef4444' : '#475569'}
                    strokeWidth={selectedRoom === room.id ? 3 : 1.5}
                    rx="3"
                    className="transition-all duration-200 hover:opacity-80"
                    style={{ filter: selectedRoom === room.id ? 'drop-shadow(0 0 8px rgba(239,68,68,0.5))' : 'none' }}
                  />

                  {room.isStair && (
                    <>
                      <line x1={room.x} y1={room.y} x2={room.x + room.width} y2={room.y + room.height} stroke="#8b7500" strokeWidth="1" opacity="0.4" />
                      <line x1={room.x + room.width} y1={room.y} x2={room.x} y2={room.y + room.height} stroke="#8b7500" strokeWidth="1" opacity="0.4" />
                    </>
                  )}

                  <text
                    x={room.x + room.width / 2}
                    y={room.y + room.height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={room.fontSize ?? (room.width < 60 ? 8 : room.width < 90 ? 10 : 12)}
                    fontWeight="600"
                    fill="#1f2937"
                    pointerEvents="none"
                    className="select-none"
                  >
                    {room.name}
                  </text>
                </g>
              ))}

              {/* Compass */}
              <text x="860" y="398" textAnchor="middle" fontSize="14" fill="#64748b">N↑</text>
            </svg>
          </div>
        </div>

        {/* Selected Room Details */}
        {selectedRoomData && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6 border-l-4 border-red-500">
            <h2 className="text-xl font-bold text-slate-800 mb-3">Room Details</h2>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded border-2 border-slate-300" style={{ backgroundColor: selectedRoomData.color }} />
              <p className="text-lg">
                <span className="font-bold text-slate-700">Name: </span>
                <span className="text-slate-600">{selectedRoomData.name}</span>
              </p>
            </div>
            {selectedRoomData.isStair && (
              <p className="mt-3 text-amber-700 bg-amber-50 p-3 rounded-lg">
                ⚠️ <span className="font-semibold">Emergency Exit:</span> This is a staircase connecting multiple floors.
              </p>
            )}
          </div>
        )}

        {/* Legend */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Legend</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {rooms.map(room => (
              <div
                key={room.id}
                onClick={() => handleClick(room.id)}
                className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all ${
                  selectedRoom === room.id ? 'border-red-400 bg-red-50' : 'border-slate-200 hover:border-slate-400'
                }`}
              >
                <div className="w-5 h-5 rounded border border-slate-400 flex-shrink-0" style={{ backgroundColor: room.color }} />
                <span className="text-sm font-medium text-slate-700 truncate">{room.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-slate-500">
          Last updated: February 2026 | Interactive Floor Plan
        </div>
      </div>
    </div>
  );
}

export default Firstfloor;