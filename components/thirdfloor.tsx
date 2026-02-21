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
  isCoridor?: boolean;
}

function ThirdFloor() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const rooms: Room[] = [
    // ============ TOP ROW (y: 20) - Major Labs ============
    { id: 'Food Lab', name: 'Food Lab', x: 30, y: 20, width: 80, height: 65, color: '#fff3e0' },
    { id: 'LIFT', name: 'LIFT', x: 120, y: 20, width: 45, height: 65, color: '#e0e0e0' },
    { id: 'Physics Lab2', name: 'Physics Lab2', x: 175, y: 20, width: 140, height: 65, color: '#ede7f6' },
    { id: 'Robotics Lab', name: 'Robotics Lab', x: 325, y: 20, width: 100, height: 65, color: '#e0f2f1' },
    { id: 'Server Room Top', name: 'Server Room', x: 435, y: 20, width: 80, height: 65, color: '#f1f8e9' },
    { id: 'Mac lab', name: 'Mac lab', x: 525, y: 20, width: 160, height: 65, color: '#fce4ec' },
    { id: 'CL12', name: 'CL12', x: 735, y: 20, width: 120, height: 135, color: '#e8eaf6' },

    // ============ TOP CORRIDOR (y: 95) ============
    { id: 'Corridor-Top', name: 'corridor', x: 175, y: 95, width: 510, height: 30, color: '#f5f5f5', isCoridor: true },

    // ============ MIDDLE ROW - LEFT CORRIDOR (y: 215) - ALIGNED TO TOP OF BOTTOM ROOMS ============
    { id: 'Corridor-Left', name: 'Corridor', x: 30, y: 215, width: 135, height: 35, color: '#f5f5f5', isCoridor: true },
    { id: 'Corridor-Left-Vert', name: 'Corridor', x: 120, y: 95, width: 35, height: 85, color: '#f5f5f5', isCoridor: true },

    // ============ STAIRS - HORIZONTAL ALIGNMENT ============
    { id: 'Stair-1', name: 'Stairs', x: 210, y: 135, width: 50, height: 30, color: '#d4af37', isStair: true },

    // ============ MIDDLE ROW - CENTER CORRIDOR ============
    { id: 'Corridor-Center', name: 'Corridor', x: 380, y: 135, width: 65, height: 45, color: '#f5f5f5', isCoridor: true },

    // ============ MIDDLE ROW - RIGHT STAIRS & CORRIDOR ============
    { id: 'Stair-2', name: 'Stairs', x: 610, y: 135, width: 50, height: 30, color: '#d4af37', isStair: true },
    { id: 'Corridor-Right', name: 'Corridor', x: 705, y: 135, width: 30, height: 45, color: '#f5f5f5', isCoridor: true },

    // ============ BOTTOM LEFT SECTION (y: 215) ============
    { id: 'GD Room', name: 'GD Room', x: 30, y: 215, width: 60, height: 70, color: '#fff3e0' },
    { id: 'Language Lab', name: 'Language Lab', x: 100, y: 215, width: 100, height: 70, color: '#fce4ec' },
    { id: 'TR-5', name: 'TR-5', x: 210, y: 215, width: 60, height: 70, color: '#ffecb3' },
    { id: 'Faculty Cabin', name: 'Faculty', x: 280, y: 215, width: 70, height: 70, color: '#c8e6c9' },

    // ============ BW - Below Faculty ============
    { id: 'BW', name: 'BW', x: 295, y: 305, width: 45, height: 35, color: '#e0e0e0' },

    // ============ BOTTOM CENTER SECTION - COMPUTER LABS (y: 215) ============
    { id: 'CL6', name: 'CL6', x: 360, y: 215, width: 105, height: 70, color: '#e3f2fd' },
    { id: 'CL5', name: 'CL5', x: 475, y: 215, width: 105, height: 70, color: '#e3f2fd' },

    // ============ MIDDLE CORRIDOR - BETWEEN CL5 AND CL4 (VERTICAL) ============
    { id: 'Corridor-Middle', name: 'Corridor', x: 585, y: 215, width: 30, height: 70, color: '#f5f5f5', isCoridor: true },

    // ============ Server Room Bottom - Below CL5/CL4 ============
    { id: 'Server Room Bottom', name: 'Server Room', x: 420, y: 305, width: 95, height: 55, color: '#f1f8e9' },

    // ============ BOTTOM RIGHT SECTION (y: 215) ============
    { id: 'CL4', name: 'CL4', x: 615, y: 215, width: 105, height: 70, color: '#e3f2fd' },
    { id: 'CL3', name: 'CL3', x: 705, y: 215, width: 105, height: 70, color: '#e3f2fd' },

    // ============ GW - Bottom Right ============
    { id: 'GW', name: 'GW', x: 735, y: 305, width: 60, height: 50, color: '#e0e0e0' },
  ];

  const getRoomColor = (room: Room): string => {
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
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Third Floor Plan</h1>
          <p className="text-lg text-slate-600">EduNav Campus Navigation System</p>
        </div>

        {/* Main Container */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          {/* SVG Floor Plan */}
          <div className="flex justify-center overflow-x-auto">
            <svg
              viewBox="0 0 920 380"
              className="border-2 border-slate-300 rounded-lg bg-white shadow-md"
              style={{ minWidth: '100%', aspectRatio: '920/380' }}
            >
              {/* Background Pattern */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="920" height="380" fill="url(#grid)" />

              {/* Building outline */}
              <rect
                x="20"
                y="15"
                width="880"
                height="350"
                fill="none"
                stroke="#999"
                strokeWidth="2"
                strokeDasharray="10,5"
                opacity="0.5"
              />

              {/* Render all rooms */}
              {rooms.map((room) => (
                <g key={room.id}>
                  {/* Room rectangle */}
                  <rect
                    x={room.x}
                    y={room.y}
                    width={room.width}
                    height={room.height}
                    fill={getRoomColor(room)}
                    stroke={selectedRoom === room.id ? '#ff6b6b' : '#2d3748'}
                    strokeWidth={selectedRoom === room.id ? '2.5' : '1.5'}
                    rx="4"
                    className="cursor-pointer transition-all duration-200 hover:opacity-80"
                    onClick={() => setSelectedRoom(selectedRoom === room.id ? null : room.id)}
                    style={{
                      filter: selectedRoom === room.id ? 'drop-shadow(0 0 8px rgba(255, 107, 107, 0.5))' : 'none',
                    }}
                  />

                  {/* Stair pattern (diagonal lines) */}
                  {room.isStair && (
                    <>
                      <line
                        x1={room.x}
                        y1={room.y}
                        x2={room.x + room.width}
                        y2={room.y + room.height}
                        stroke="#8b7500"
                        strokeWidth="1"
                        opacity="0.4"
                      />
                      <line
                        x1={room.x + room.width}
                        y1={room.y}
                        x2={room.x}
                        y2={room.y + room.height}
                        stroke="#8b7500"
                        strokeWidth="1"
                        opacity="0.4"
                      />
                      <line
                        x1={room.x + room.width / 2}
                        y1={room.y}
                        x2={room.x + room.width / 2}
                        y2={room.y + room.height}
                        stroke="#8b7500"
                        strokeWidth="1"
                        opacity="0.4"
                      />
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
                      fontSize={room.width < 50 ? '9' : room.width < 80 ? '10' : '11'}
                      fontWeight="600"
                      fill="#1f2937"
                      pointerEvents="none"
                    >
                      {room.name}
                    </text>
                  )}
                </g>
              ))}

              {/* Border lines */}
              <line x1="20" y1="15" x2="900" y2="15" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="20" y1="365" x2="900" y2="365" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="20" y1="15" x2="20" y2="365" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="900" y1="15" x2="900" y2="365" stroke="#cbd5e1" strokeWidth="1" />
            </svg>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Legend - All Rooms & Facilities</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 max-h-72 overflow-y-auto">
            {rooms.map((room) => (
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
            {rooms.map((room) => {
              if (room.id === selectedRoom) {
                return (
                  <div key={room.id} className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg border-2 border-slate-300"
                        style={{ backgroundColor: room.color }}
                      />
                      <div>
                        <p className="text-xl font-bold text-slate-800">{room.name}</p>
                        <p className="text-sm text-slate-500">ID: {room.id}</p>
                      </div>
                    </div>

                    {/* Room Type Information */}
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      {room.isStair && (
                        <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded">
                          <p className="text-amber-800">
                            <span className="font-semibold">⚠️ Emergency Exit:</span> Staircase connecting multiple floors
                          </p>
                        </div>
                      )}
                      {room.isCoridor && (
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                          <p className="text-blue-800">
                            <span className="font-semibold">ℹ️ Corridor:</span> Pathway connecting different sections
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>Last updated: February 2026 | Interactive Third Floor Plan</p>
        </div>
      </div>
    </div>
  );
}

export default ThirdFloor;