'use client'

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import BookingModal from '@/components/BookingModal';

const fetcher = (url: string) => fetch(url).then(res => res.json());

type DoorPosition = 'top' | 'bottom' | 'left' | 'right';

interface DoorSpec {
  position: DoorPosition;
  width?: number;
  height?: number;
  offset?: number;
  interactive?: boolean;
  x?: number;
  y?: number;
}

interface Room {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  isStair?: boolean;
  stairDirection?: number;
  clickable?: boolean;
  door?: DoorPosition | DoorSpec | Array<DoorPosition | DoorSpec>;
}

function SecondFloor({ setFloor }: { setFloor: (floor: 'minus1' | 'ground' | 'first' | 'second' | 'third' | 'fourth') => void }) {
  const [selectedRoom, setSelectedRoom] = useState<{id:string; name:string; floor:number} | null>(null);
  const [roomStatuses, setRoomStatuses] = useState<Record<string, boolean>>({});

  const { data: roomsData, mutate } = useSWR('/api/rooms', fetcher, { refreshInterval: 60000 });

  useEffect(() => {
    if (roomsData && Array.isArray(roomsData)) {
      const map: Record<string, boolean> = {};
      roomsData.forEach((r: any) => { 
        if (r.roomName) {
          const key = r.roomName.toLowerCase().replace(/\s+/g, '');
          map[key] = r.occupied;
        }
      });
      setRoomStatuses(map);
    }
  }, [roomsData]);

  const floors = [
    { value: 'minus1', label: '-1 Floor' },
    { value: 'ground', label: 'Ground' },
    { value: 'first',  label: '1st Floor' },
    { value: 'second', label: '2nd Floor' },
    { value: 'third',  label: '3rd Floor' },
    { value: 'fourth', label: '4th Floor' },
  ];

  const rooms: Room[] = [
    { id: 'DBT', name: 'DBT', x: 20, y: 20, width: 100, height: 90, color: '#f3e5f5', clickable: true, door: { position: 'right', offset: 0 } },
    { id: 'lift', name: 'Lift', x: 160, y: 20, width: 50, height: 35, color: '#ede7f6', clickable: false },
    { id: 'block-1', name: 'PC OFFICE', x: 270, y: 10, width: 118, height: 80, color: '#f3e5f5', clickable: true, door: { position: 'bottom', offset: 0 } },
    { id: 'STAFF ROOM', name: 'VC OFFICE', x: 390, y: 10, width: 118, height: 80, color: '#e3f2fd', clickable: true, door: { position: 'bottom', offset: 0 } },
    { id: 'block-3', name: 'DEAN OFFICE', x: 510, y: 10, width: 118, height: 80, color: '#f1f8e9', clickable: true, door: { position: 'bottom', offset: 0 } },
    { id: 'cr11', name: 'CR 11', x: 680, y: 10, width: 88, height: 80, color: '#c8e6c9', clickable: true, door: [{ position: 'bottom', offset: -18 }, { position: 'bottom', offset: 18 }] },
    { id: 'cr12', name: 'CR 12', x: 770, y: 10, width: 88, height: 80, color: '#c8e6c9', clickable: true, door: [{ position: 'bottom', offset: -18 }, { position: 'bottom', offset: 18 }] },
    { id: 'Stair-BW', name: 'Stair ↑', x: 270, y: 107, width: 118, height: 20, color: '#d4af37', isStair: true, stairDirection: 1, clickable: false },
    { id: 'Stair-Lobby', name: 'Stair ↓', x: 510, y: 107, width: 118, height: 20, color: '#d4af37', isStair: true, stairDirection: -1, clickable: false },
    { id: 'space-left', name: '', x: 20, y: 130, width: 158, height: 120, color: '#e0e0e0', clickable: false },
    { id: 'corridor-gap1', name: 'Corridor', x: 180, y: 130, width: 68, height: 120, color: '#f5f5f5', clickable: false },
    { id: 'space-middle', name: '', x: 250, y: 130, width: 378, height: 120, color: '#e0e0e0', clickable: false },
    { id: 'corridor-gap2', name: 'Corridor', x: 630, y: 130, width: 48, height: 120, color: '#f5f5f5', clickable: false },
    { id: 'space-right', name: '', x: 680, y: 130, width: 178, height: 120, color: '#e0e0e0', clickable: false },
    { id: 'cif', name: 'CIF', x: 10, y: 290, width: 30, height: 90, color: '#e1f5fe', clickable: true, door: [{ position: 'right', offset: -30 }] },
    { id: 'lt3', name: 'TR 7', x: 42, y: 320, width: 58, height: 60, color: '#e1f5fe', clickable: true, door: { position: 'top', offset: 0 } },
    { id: 'TR6', name: 'TR 6', x: 102, y: 320, width: 58, height: 60, color: '#c8e6c9', clickable: true, door: { position: 'top', offset: 0 } },
    { id: 'cr8', name: 'TR 5', x: 162, y: 320, width: 58, height: 60, color: '#c8e6c9', clickable: true, door: { position: 'top', offset: 0 } },
    { id: 'RR', name: 'RR', x: 222, y: 290, width: 30, height: 90, color: '#e0f2f1', clickable: true, door: [{ position: 'left', offset: -30 }] },
    { id: 'GW', name: 'GW', x: 254, y: 310, width: 38, height: 70, color: '#e0f2f1', clickable: false },
    { id: 'cr7', name: 'ECE LAB 3', x: 294, y: 290, width: 78, height: 90, color: '#c8e6c9', clickable: true, door: { position: 'top', offset: 0 } },
    { id: 'ECE LAB4', name: 'ECE LAB 4', x: 374, y: 290, width: 78, height: 90, color: '#c8e6c9', clickable: true, door: { position: 'top', offset: 0 } },
    { id: 'SRS', name: 'SRS ROOM', x: 454, y: 340, width: 28, height: 40, color: '#c8e6c9', clickable: true, door: { position: 'top', offset: 0 } },
    { id: 'ECE LAB5', name: 'ECE LAB 5', x: 484, y: 290, width: 78, height: 90, color: '#c8e6c9', clickable: true, door: { position: 'top', offset: 0 } },
    { id: 'ECE LAB1', name: 'BIOTECH LAB', x: 564, y: 290, width: 78, height: 90, color: '#c8e6c9', clickable: true, door: { position: 'top', offset: 0 } },
    { id: 'bw', name: 'bw', x: 644, y: 310, width: 38, height: 70, color: '#e0f2f1', clickable: false },
    { id: 'lab1', name: 'BIOINFO. LAB', x: 684, y: 290, width: 78, height: 90, color: '#ffecb3', clickable: true, door: { position: 'top', offset: 0 } },
    { id: 'server-room', name: 'SR', x: 764, y: 310, width: 30, height: 70, color: '#e0f2f1', clickable: true, door: { position: 'left', offset: 0 } },
    { id: 'cl1', name: 'CL 1', x: 796, y: 240, width: 64, height: 140, color: '#ffecb3', clickable: true, door: { position: 'left', offset: -35 } },
    { id: 'mughal-garden', name: 'Mughal Garden', x: 20, y: 390, width: 840, height: 130, color: '#d4edda', clickable: false },
  ];

  const clickableRooms = rooms.filter(r => r.clickable);

  const getRoomColor = (room: Room) => {
    if (!room.clickable) return room.color;
    const statusKey = room.id.toLowerCase().replace(/\s+/g, '');
    if (roomStatuses[statusKey] === true) return '#ef4444'; // Red
    if (roomStatuses[statusKey] === false) return '#22c55e'; // Green
    return room.color;
  };

  const renderDoorOne = (room: Room, doorRaw: DoorPosition | DoorSpec, key?: string | number) => {
    const spec: DoorSpec = typeof doorRaw === 'string' ? { position: doorRaw } : doorRaw;
    const pos = spec.position;
    const slabW = spec.width ?? (pos === 'top' || pos === 'bottom' ? 20 : 4);
    const slabH = spec.height ?? (pos === 'left' || pos === 'right' ? 20 : 8);
    const offset = spec.offset ?? 0;
    const interactive = spec.interactive ?? false;
    const pointer = interactive ? undefined : 'none';

    let x = room.x + (room.width - slabW) / 2 + (pos === 'left' || pos === 'right' ? 0 : offset);
    let y = room.y - slabH / 2;

    if (pos === 'top') {
      x = room.x + (room.width - slabW) / 2 + offset;
      y = room.y - slabH / 2;
    } else if (pos === 'bottom') {
      x = room.x + (room.width - slabW) / 2 + offset;
      y = room.y + room.height - slabH / 2;
    } else if (pos === 'left') {
      x = room.x - slabW / 2;
      y = room.y + (room.height - slabH) / 2 + offset;
    } else if (pos === 'right') {
      x = room.x + room.width - slabW / 2;
      y = room.y + (room.height - slabH) / 2 + offset;
    }

    const userX = spec.x;
    const userY = spec.y;
    const boxW = spec.width ?? Math.min(16, slabW);
    const boxH = spec.height ?? Math.min(12, slabH);

    let bx: number;
    let by: number;

    if (typeof userX === 'number' && typeof userY === 'number') {
      bx = userX;
      by = userY;
    } else {
      const cx = x + slabW / 2;
      const cy = y + slabH / 2;
      bx = cx - boxW / 2;
      by = cy - boxH / 2;
    }

    return (
      <g key={key} pointerEvents={pointer as React.CSSProperties['pointerEvents']} aria-hidden={!interactive}>
        <rect
          x={bx}
          y={by}
          width={boxW}
          height={boxH}
          fill="url(#grid)"
          stroke="#475569"
          strokeWidth="1"
          rx="1"
          opacity="1"
        />
        <line x1={bx} y1={by} x2={bx} y2={by + boxH} stroke="#475569" strokeWidth="1" opacity="0.9" />
        <line x1={bx + boxW} y1={by} x2={bx + boxW} y2={by + boxH} stroke="#475569" strokeWidth="1" opacity="0.9" />
      </g>
    );
  };

  const renderDoor = (room: Room) => {
    if (!room.door) return null;
    if (Array.isArray(room.door)) {
      return room.door.map((d, i) => renderDoorOne(room, d, i));
    }
    return renderDoorOne(room, room.door);
  };

  const handleStairNavigation = (direction: number) => {
    if (direction < 0) {
      setFloor('first');
      return;
    }
    setFloor('third');
  };

  const handleRoomClick = (room: Room) => {
    if (room.isStair && room.stairDirection) {
      handleStairNavigation(room.stairDirection);
      return;
    }

    if (!room.clickable) return;
    setSelectedRoom({ id: room.id, name: room.name, floor: 2 });
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
                2nd Floor Plan
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
                  border: f.value === 'second' ? '1.5px solid #ffd700' : '1.5px solid rgba(255,255,255,0.2)',
                  background: f.value === 'second' ? 'linear-gradient(135deg, #b8860b, #ffd700)' : 'rgba(255,255,255,0.08)',
                  color: f.value === 'second' ? '#1a1000' : 'rgba(255,255,255,0.75)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: f.value === 'second' ? '0 0 10px rgba(255,215,0,0.4)' : 'none',
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
                const isInteractive = room.clickable || room.isStair;
                return (
                  <g key={room.id}
                    className={isInteractive ? 'transition-transform duration-200 hover:scale-105 active:scale-100' : 'cursor-default'}
                    style={isInteractive ? { transformBox: 'fill-box', transformOrigin: 'center' } : undefined}>
                    <rect
                      x={room.x} y={room.y}
                      width={room.width} height={room.height}
                      fill={getRoomColor(room)}
                      stroke={room.isStair ? '#8B4513' : '#64748b'}
                      strokeWidth={room.isStair ? 3 : 1.5}
                      rx="5"
                      className={isInteractive ? 'cursor-pointer transition-all duration-200' : 'cursor-default transition-all duration-200'}
                      onClick={() => handleRoomClick(room)}
                      style={{
                        filter: room.isStair ? 'drop-shadow(0 0 4px rgba(139, 69, 19, 0.5))' : 'none'
                      }}
                    />
                    {renderDoor(room)}
                    {room.isStair && (
                      (() => {
                        if (room.width > room.height) {
                          const steps = Math.max(4, Math.floor(room.width / 12));
                          const stepWidth = room.width / steps;
                          const riserWidth = Math.max(2, stepWidth - 2);
                          const stepHeightOffset = room.height / steps;
                          const baseY = room.y + room.height;

                          return (
                            <g>
                              {Array.from({ length: steps }).map((_, i) => {
                                const x = room.x + i * stepWidth;
                                const h = Math.max(4, (i + 1) * stepHeightOffset);
                                const y = baseY - h;

                                return (
                                  <rect
                                    key={i}
                                    x={x}
                                    y={y}
                                    width={riserWidth}
                                    height={h}
                                    fill="#6a4f0bff"
                                    stroke="#8b7500"
                                    strokeWidth="0.4"
                                    opacity="0.95"
                                  />
                                );
                              })}
                            </g>
                          );
                        }

                        const steps = Math.max(4, Math.floor(room.height / 12));
                        const stepHeight = room.height / steps;
                        const stepWidthOffset = room.width / steps;
                        const gap = Math.max(1, stepHeight * 0.12);

                        return (
                          <g>
                            {Array.from({ length: steps }).map((_, i) => {
                              const x = room.x + i * stepWidthOffset;
                              const h = Math.max(2, stepHeight - gap);
                              const y = room.y + room.height - (i + 1) * stepHeight + gap / 2;
                              const w = Math.max(2, room.width - i * stepWidthOffset);

                              return (
                                <rect
                                  key={i}
                                  x={x}
                                  y={y}
                                  width={w}
                                  height={h}
                                  fill="#6a4f0bff"
                                  stroke="#8b7500"
                                  strokeWidth="0.4"
                                  opacity="0.95"
                                />
                              );
                            })}
                          </g>
                        );
                      })()
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
                        fill={roomStatuses[room.id.toLowerCase().replace(/\s+/g, '')] === true ? '#ef4444' :
                              roomStatuses[room.id.toLowerCase().replace(/\s+/g, '')] === false ? '#22c55e' : '#94a3b8'}
                        opacity="1" pointerEvents="none"/>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Legend — only clickable rooms */}
        <div style={glassCard}>
          <h2 className="text-lg font-bold mb-4" style={{ color: '#ffd700' }}>Legend</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {clickableRooms.map(room => (
              <div key={room.id} onClick={() => handleRoomClick(room)}
                className="flex items-center gap-3 p-3 rounded-xl transition-all"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,215,0,0.4)',
                  cursor: 'pointer',
                  backdropFilter: 'blur(6px)',
                }}
              >
                <div className="w-5 h-5 rounded flex-shrink-0"
                  style={{ backgroundColor: room.color, border: '1px solid rgba(255,255,255,0.5)' }}/>
                <span className="text-sm font-semibold" style={{ color: '#f0f4ff' }}>{room.name}</span>
                <span className="ml-auto text-xs" style={{ 
                  color: roomStatuses[room.id.toLowerCase().replace(/\s+/g, '')] === true ? '#ef4444' :
                         roomStatuses[room.id.toLowerCase().replace(/\s+/g, '')] === false ? '#22c55e' : '#94a3b8'
                }}>●</span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <span style={{ display:'inline-block', width:10, height:10, borderRadius:'50%', background:'#22c55e', boxShadow:'0 0 5px #22c55e' }}/>
              <span className="text-xs font-bold text-white/70 uppercase tracking-widest">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ display:'inline-block', width:10, height:10, borderRadius:'50%', background:'#ef4444', boxShadow:'0 0 5px #ef4444' }}/>
              <span className="text-xs font-bold text-white/70 uppercase tracking-widest">Occupied Now</span>
            </div>
            <div className="flex items-center gap-2">
              <span style={{ display:'inline-block', width:10, height:10, borderRadius:'50%', background:'#94a3b8' }}/>
              <span className="text-xs font-bold text-white/70 uppercase tracking-widest">Status Loading</span>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-xs" style={{ color: 'rgba(180,210,255,0.4)' }}>
          Last updated: February 2026 | Interactive Floor Plan
        </div>

        <BookingModal 
          room={selectedRoom}
          onClose={() => setSelectedRoom(null)}
          onSuccess={() => { setSelectedRoom(null); mutate(); }}
        />
      </div>
    </div>
  );
}

export default SecondFloor;