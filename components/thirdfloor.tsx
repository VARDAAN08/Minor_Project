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
    { id: 'Physics Lab2', name: 'Physics Lab2', x: 175, y: 20, width: 110, height: 65, color: '#ede7f6' },
    { id: 'Robotics Lab', name: 'Robotics Lab', x: 290, y: 20, width: 95, height: 65, color: '#e0f2f1' },
    { id: 'Server Room Top', name: 'Server Room', x: 390, y: 20, width: 80, height: 65, color: '#f1f8e9' },
    { id: 'Mac lab', name: 'Mac lab', x: 475, y: 20, width: 250, height: 65, color: '#fce4ec' },
    { id: 'ECE Lab-9', name: 'ECE Lab-9', x: 732, y: 20, width: 55, height: 150, color: '#e8eaf6' },
    {id:'ECE Lab-8',name:'ECE Lab-8',x:792,y:20,width:55,height:150,color:'#e8eaf6'},
    {id:'BI project lab',name:'BI Project Lab',x:850,y:20,width:69,height:150,color:'#e8eaf6'},
    // ============ TOP CORRIDOR (y: 95) ============
    { id: 'Corridor-Top', name: 'corridor', x: 120, y: 95, width:608, height: 30, color: '#f5f5f5', isCoridor: true },

    // ============ MIDDLE ROW - LEFT CORRIDOR & STAIRS (y: 135) ============
    { id: 'Corridor-Left-Vert', name: 'Corridor', x: 193, y: 130, width: 37, height: 150, color: '#f5f5f5', isCoridor: true },

    // ============ STAIRS - HORIZONTAL ALIGNMENT ============
    { id: 'Stair-1', name: 'Stairs', x: 240, y: 130, width: 50, height: 30, color: '#d4af37', isStair: true },

    // ============ MIDDLE ROW - RIGHT STAIRS & CORRIDOR ============
    { id: 'Stair-2', name: 'Stairs', x: 585, y: 130, width: 50, height: 30, color: '#d4af37', isStair: true },
    { id: 'Corridor-Right', name: 'Corridor', x:686, y: 130, width: 40, height:150, color: '#f5f5f5', isCoridor: true },

    // ============ LEFT CORRIDOR - JUST ABOVE GD ROOM & LANGUAGE LAB (y: 180) ============
    { id: 'Corridor-Left', name: 'Corridor', x: 35, y: 180, width: 150, height: 30, color: '#f5f5f5', isCoridor: true },

    // ============ BOTTOM LEFT SECTION (y: 215) ============
    { id: 'GD Room', name: 'GD', x: 30, y: 215, width:17, height: 70, color: '#fff3e0' },
    { id: 'Language Lab', name: 'Lang Lab', x:52, y: 215, width: 50, height: 70, color: '#fce4ec' },
    { id: 'TR-5', name: 'TR-5', x: 107, y: 215, width: 30, height: 70, color: '#ffecb3' },
    { id: 'Faculty Cabin', name: 'Faculty', x: 142, y: 215, width: 40, height: 70, color: '#c8e6c9' },

    // ============ BW - Below Faculty ============
    { id: 'BW', name: 'BW', x: 190, y: 290, width: 45, height: 35, color: '#e0e0e0' },

    // ============ BOTTOM CENTER SECTION - COMPUTER LABS (y: 215) ============
    { id: 'CL6', name: 'CL6', x: 240, y: 215, width: 80, height: 70, color: '#e3f2fd' },
    { id: 'CL5', name: 'CL5', x: 330, y: 215, width: 80, height: 70, color: '#e3f2fd' },

    // ============ MIDDLE CORRIDOR - BETWEEN CL5 AND CL4 (VERTICAL) ============
    { id: 'Corridor-Middle', name: 'Corridor', x: 415,y: 130, width:45, height: 155, color: '#f5f5f5', isCoridor: true },

    // ============ Server Room Bottom - Below CL5/CL4 ============
    { id: 'Server Room Bottom', name: 'Server Room', x: 390, y: 290, width: 95, height: 55, color: '#f1f8e9' },

    // ============ BOTTOM RIGHT SECTION (y: 215) ============
    { id: 'CL4', name: 'CL4', x:465, y: 215, width: 105, height: 70, color: '#e3f2fd' },
    { id: 'CL3', name: 'CL3', x: 576, y: 215, width: 105, height: 70, color: '#e3f2fd' },
    {id:'CIF',name:'Central Instrumentation Facility',x:732,y:215,width:185,height:70,color:'#e3f2fd'},

    // ============ GW - Bottom Right ============
    { id: 'GW', name: 'GW', x: 684, y: 290, width: 45, height: 35, color: '#e0e0e0' },
  ];

  const getRoomColor = (room: Room): string => {
    if (selectedRoom === room.id) return '#ffd54f';
    return room.color;
  };

  // Updated interaction logic
  const isInteractive = (room: Room) =>
    !room.isCoridor &&
    !room.isStair &&
    room.id !== 'Server Room Top' &&
    room.id !== 'Server Room Bottom' &&
    room.id !== 'BW' &&
    room.id !== 'GW'&&
    room.id!=='CIF'&&
    room.id!=='Faculty Cabin';

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
                    className={`transition-all duration-200 ${
                      isInteractive(room) ? 'cursor-pointer' : 'cursor-default'
                    }`}
                    onClick={() => {
                      if (isInteractive(room)) {
                        setSelectedRoom(selectedRoom === room.id ? null : room.id);
                      }
                    }}
                    style={{
                      transformBox: 'fill-box',
                      transformOrigin: 'center',
                      transition: 'all 0.2s ease',
                      filter: selectedRoom === room.id
                        ? 'drop-shadow(0 0 8px rgba(255, 107, 107, 0.5))'
                        : 'none',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.85';
                      e.currentTarget.style.transform = 'scale(1.04)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  />

                  {/* Stair pattern (diagonal lines) */}
                  {room.isStair && (
                    <>
                      <line x1={room.x} y1={room.y} x2={room.x + room.width} y2={room.y + room.height} stroke="#8b7500" strokeWidth="1" opacity="0.4" />
                      <line x1={room.x + room.width} y1={room.y} x2={room.x} y2={room.y + room.height} stroke="#8b7500" strokeWidth="1" opacity="0.4" />
                      <line x1={room.x + room.width/2} y1={room.y} x2={room.x + room.width/2} y2={room.y + room.height} stroke="#8b7500" strokeWidth="1" opacity="0.4" />
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
                      fill="#1f2937"
                      pointerEvents="none"
                    >
                      {room.name}
                    </text>
                  )}
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Legend</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {rooms
              .filter(room => isInteractive(room))
              .map(room => (
                <div
                  key={room.id}
                  className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 cursor-pointer hover:border-slate-400 transition-all"
                  onClick={() => setSelectedRoom(selectedRoom === room.id ? null : room.id)}
                >
                  <div
                    className="w-5 h-5 rounded border border-slate-400 flex-shrink-0"
                    style={{ backgroundColor: room.color }}
                  />
                  <span className="text-sm font-medium text-slate-700 truncate">
                    {room.name}
                  </span>
                </div>
              ))}
          </div>
        </div>

        {/* Room Details Panel */}
        {selectedRoom && (
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Room Details</h2>
            {rooms.map(room =>
              room.id === selectedRoom ? (
                <div key={room.id} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded border-2 border-slate-300"
                    style={{ backgroundColor: room.color }}
                  />
                  <p className="text-lg text-slate-700">{room.name}</p>
                </div>
              ) : null
            )}
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

export default ThirdFloor;