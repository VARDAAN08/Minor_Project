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
function FloorGround({ setFloor }: { setFloor: (floor: 'minus1' | 'ground' | 'first' | 'second' | 'third' | 'fourth') => void }) {
  const [selectedRooms, setSelectedRooms] = useState<Set<string>>(new Set());

  const floors = [
    { value: 'minus1', label: '-1 Floor' },
    { value: 'ground', label: 'Ground' },
    { value: 'first',  label: '1st Floor' },
    { value: 'second', label: '2nd Floor' },
    { value: 'third',  label: '3rd Floor' },
    { value: 'fourth', label: '4th Floor' },
  ];

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
    { id: 'cr 3', name: 'CR 3', x: 777, y: 250, width: 90, height: 130, color: '#c8e6c9', clickable: true },
    { id: 'cr 4', name: 'CR 4', x: 680, y: 250, width: 90, height: 130, color: '#c8e6c9', clickable: true },
    { id: 'Lab', name: 'Lab', x: 680, y: 15, width: 90, height: 110, color: '#ffecb3', clickable: true },
    { id: 'Adm. cell', name: 'Adm. cell', x: 775, y: 17, width: 88, height: 130, color: '#f8bbd0', clickable: false },
    { id: 'corridor-top', name: 'Corridor', x: 20, y: 149, width: 845, height: 90, color: '#f5f5f5', clickable: false },
    { id: 'Audi', name: 'Audi', x: 15, y: 15, width: 100, height: 388, color: '#e1f5fe', clickable: true },
    { id: 'mughal-garden', name: 'Mughal Garden', x: 16, y: 390, width: 855, height: 130, color: '#d4edda', clickable: true },
    { id: 'Stair-LT2', name: 'Stair', x: 295, y: 14, width: 18, height: 110, color: '#d4af37', isStair: true, clickable: false },
  ];

  const clickableRooms = rooms.filter(r => r.clickable);

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

  const glassCard = {
    background: 'rgba(255,255,255,0.06)',
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    border: '1px solid rgba(255,215,0,0.25)',
    borderRadius: '16px',
    boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
    padding: '20px',
    marginBottom: '20px',
  };

  return (
    <div className="min-h-screen p-6" style={{ position: 'relative', overflow: 'hidden' }}>

      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: 'url("/juitpit2.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(0.45) saturate(1.2) contrast(1.1)',
        zIndex: 0,
      }} />

      <div style={{
        position: 'fixed', inset: 0,
        background: 'linear-gradient(135deg, rgba(5,15,45,0.55) 0%, rgba(10,30,80,0.45) 50%, rgba(20,10,50,0.55) 100%)',
        zIndex: 1,
      }} />

      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #b8860b, #ffd700, #f0c040, #ffd700, #b8860b)',
        zIndex: 10,
        boxShadow: '0 0 12px rgba(255,215,0,0.6)',
      }} />

      <div className="max-w-7xl mx-auto pt-2" style={{ position: 'relative', zIndex: 5 }}>

        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div style={{
              width: '5px', minHeight: '56px', borderRadius: '4px',
              background: 'linear-gradient(180deg, #ffd700, #b8860b)',
              boxShadow: '0 0 10px rgba(255,215,0,0.5)',
              flexShrink: 0,
            }} />
            <div>
              <h1 className="text-3xl font-bold mb-1" style={{
                color: '#ffd700',
                textShadow: '0 2px 16px rgba(0,0,0,0.7), 0 0 30px rgba(255,215,0,0.2)',
                letterSpacing: '0.5px',
              }}>
                Ground Floor Plan
              </h1>
              <p className="text-sm font-medium tracking-widest uppercase" style={{ color: 'rgba(180,210,255,0.75)' }}>
                EduNav Campus Navigation System
              </p>
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,215,0,0.3)',
            borderRadius: '12px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap',
          }}>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,215,0,0.7)', marginRight: '4px' }}>
              Floor
            </span>
            {floors.map(f => (
              <button
                key={f.value}
                onClick={() => setFloor(f.value as 'minus1' | 'ground' | 'first' | 'second' | 'third' | 'fourth')}
                style={{
                  padding: '5px 14px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 700,
                  border: f.value === 'ground' ? '1.5px solid #ffd700' : '1.5px solid rgba(255,255,255,0.2)',
                  background: f.value === 'ground' ? 'linear-gradient(135deg, #b8860b, #ffd700)' : 'rgba(255,255,255,0.08)',
                  color: f.value === 'ground' ? '#1a1000' : 'rgba(255,255,255,0.75)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: f.value === 'ground' ? '0 0 10px rgba(255,215,0,0.4)' : 'none',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* SVG Card */}
        <div style={glassCard}>
          <div className="flex items-center gap-2 mb-3">
            <span style={{ display:'inline-block', width:8, height:8, borderRadius:'50%', background:'#ffd700', boxShadow:'0 0 6px #ffd700' }}/>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,215,0,0.75)' }}>Floor Map</span>
          </div>
          <div className="flex justify-center">
            <svg
              viewBox="0 0 880 530"
              className="rounded-xl"
              style={{
                width: '90%',
                display: 'block',
                margin: '0 auto',
                border: '1px solid rgba(255,215,0,0.15)',
                background: 'rgba(255,255,255,0.95)',
                aspectRatio: '880/530',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              }}
            >
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ececec" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="880" height="530" fill="url(#grid)" />

              {rooms.map(room => {
                const isSelected = room.clickable && selectedRooms.has(room.id);
                return (
                  <g key={room.id} onClick={() => handleRoomClick(room)}
                    className={room.clickable ? 'cursor-pointer' : 'cursor-default'}>
                    <rect
                      x={room.x} y={room.y}
                      width={room.width} height={room.height}
                      fill={getRoomColor(room)}
                      stroke={isSelected ? '#ef4444' : '#64748b'}
                      strokeWidth={isSelected ? 3 : 1.5}
                      rx="5"
                      className={`transition-all duration-200 ${room.clickable ? 'hover:opacity-75' : ''}`}
                      style={{ filter: isSelected ? 'drop-shadow(0 0 10px rgba(239,68,68,0.6))' : 'none' }}
                    />
                    {room.isStair && (
                      <>
                        <line x1={room.x} y1={room.y} x2={room.x+room.width} y2={room.y+room.height} stroke="#8b7500" strokeWidth="1" opacity="0.35"/>
                        <line x1={room.x+room.width} y1={room.y} x2={room.x} y2={room.y+room.height} stroke="#8b7500" strokeWidth="1" opacity="0.35"/>
                        <line x1={room.x+room.width/2} y1={room.y} x2={room.x+room.width/2} y2={room.y+room.height} stroke="#8b7500" strokeWidth="1" opacity="0.35"/>
                      </>
                    )}
                    {room.name && (
                      <text
                        x={room.x+room.width/2} y={room.y+room.height/2}
                        textAnchor="middle" dominantBaseline="middle"
                        fontSize={room.width < 80 ? '10' : '13'}
                        fontWeight="700" fill="#1e293b"
                        pointerEvents="none" className="select-none"
                      >{room.name}</text>
                    )}
                    {room.clickable && (
                      <circle cx={room.x+room.width-8} cy={room.y+8} r="5"
                        fill="#22c55e" opacity="1" pointerEvents="none"/>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Selected Rooms */}
        {selectedRooms.size > 0 && (
          <div style={{
            ...glassCard,
            border: '1px solid rgba(239,68,68,0.5)',
            borderLeft: '4px solid #ef4444',
          }}>
            <h2 className="text-lg font-bold mb-3" style={{ color: '#ffd700' }}>
              Selected Rooms ({selectedRooms.size})
            </h2>
            <div className="space-y-2">
              {rooms.filter(r => selectedRooms.has(r.id)).map(room => (
                <div key={room.id} className="flex items-center gap-3 p-2 rounded-lg"
                  style={{ background: 'rgba(255,255,255,0.1)' }}>
                  <div className="w-6 h-6 rounded"
                    style={{ backgroundColor: room.color, border: '2px solid rgba(255,215,0,0.5)' }}/>
                  <span className="text-sm font-bold" style={{ color: '#fff' }}>{room.name}</span>
                  {room.isStair && <span className="text-amber-400 text-xs ml-auto">⚠️ Stair</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Legend — only clickable rooms */}
        <div style={glassCard}>
          <h2 className="text-lg font-bold mb-4" style={{ color: '#ffd700' }}>Legend</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {clickableRooms.map(room => (
              <div key={room.id} onClick={() => handleRoomClick(room)}
                className="flex items-center gap-3 p-3 rounded-xl transition-all"
                style={{
                  background: selectedRooms.has(room.id) ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.08)',
                  border: selectedRooms.has(room.id) ? '1px solid rgba(239,68,68,0.7)' : '1px solid rgba(255,215,0,0.4)',
                  cursor: 'pointer',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <div className="w-5 h-5 rounded flex-shrink-0"
                  style={{ backgroundColor: room.color, border: '1px solid rgba(255,255,255,0.5)' }}/>
                <span className="text-sm font-semibold" style={{ color: '#f0f4ff' }}>{room.name}</span>
                <span className="ml-auto text-xs" style={{ color: '#22c55e' }}>●</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs flex items-center gap-2" style={{ color: 'rgba(180,210,255,0.55)' }}>
            <span style={{ display:'inline-block', width:9, height:9, borderRadius:'50%', background:'#22c55e', boxShadow:'0 0 5px #22c55e' }}/>
            Green dot indicates clickable rooms
          </p>
        </div>

        <div className="mt-4 text-center text-xs" style={{ color: 'rgba(180,210,255,0.4)' }}>
          Last updated: February 2026 | Interactive Floor Plan
        </div>
      </div>
    </div>
  );
}

export default FloorGround;