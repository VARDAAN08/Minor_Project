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

function fourthfloor() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  const rooms: Room[] = [
{ id:'CR-16', name:'CR-16', x:765, y:10, width:150, height:100, color:'#cffafe' },
{ id:'CR-17', name:'CR-17', x:600, y:10, width:150, height:100, color:'#cffafe' },
{id:'corridor-17-18',name:'Corridor',x:410,y:10,width:180,height:100,color:'#f8fafc',isCoridor:true },
{ id:'Corridor-middle', name:'Corridor', x:90, y:125, width:800, height:130, color:'#f8fafc', isCoridor:true },

{ id:'CR-18', name:'CR-18', x:250, y:10, width:150, height:100, color:'#cffafe' },
{ id:'CR-19', name:'CR-19', x:90, y:10, width:150, height:100, color:'#cffafe' },
{id:'stairs',name:'Stairs',x:840, y:270, width:70, height:70, color:'#d4af37', isStair:true },

{ id:'DBT lab', name:'DBT Lab', x:180, y:270, width:650, height:100, color:'#dbeafe' },

{ id:'Corridor-left', name:'Corridor', x:115, y:270, width:60, height:100, color:'#f8fafc', isCoridor:true },

{ id:'Green house', name:'Green House', x:10, y:270, width:100, height:100, color:'#ccfbf1' },
  ];

  const getRoomColor = (room: Room): string => {
    if (selectedRoom === room.id) return '#ffd54f';
    return room.color;
  };

  // Updated interaction logic
  const isInteractive = (room: Room) =>
    !room.isCoridor &&
    !room.isStair &&
    room.id !== 'Green house';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Fourth Floor Plan</h1>
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

export default fourthfloor;