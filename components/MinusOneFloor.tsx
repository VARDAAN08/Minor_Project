'use client'
import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import BookingModal from '@/components/BookingModal';
import LiveDateTime from './LiveDateTime';

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

function MinusOneFloor({ setFloor }: { setFloor: (floor: 'minus1' | 'ground' | 'first' | 'second' | 'third' | 'fourth') => void }) {
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
    { id: 'Basement', name: 'Basement', x: 13, y: 328, width: 856, height: 200, color: '#e3f2fd', clickable: false },
    { id: 'Corridor', name: 'Corridor', x: 20, y: 27, width: 770, height: 170, color: '#e8f4f8', clickable: false },
    { id: 'Library', name: 'Library -1', x: 319, y: 239, width: 345, height: 90, color: '#f3e5f5', clickable: false },
    { id: 'Tuck shop', name: 'Tuck shop', x: 665, y: 239, width: 200, height: 90, color: '#fff3e0', clickable: false },
    { id: 'CR 1', name: 'CR 1', x: 15, y: 239, width: 150, height: 90, color: '#f1f8e9', clickable: true },
    { id: 'CR 2', name: 'CR 2', x: 168, y: 239, width: 150, height: 90, color: '#f1f8e9', clickable: true },
    { id: 'Stair', name: 'Stair', x: 790, y: 27, width: 79, height: 170, color: '#d4af37', isStair: true, clickable: false },
  ];

  const clickableRooms = rooms.filter(r => r.clickable);

  const getRoomColor = (room: Room) => {
    if (!room.clickable) return room.color;
    const statusKey = room.id.toLowerCase().replace(/\s+/g, '');
    if (roomStatuses[statusKey] === true) return '#ef4444'; // Red
    if (roomStatuses[statusKey] === false) return '#22c55e'; // Green
    return room.color;
  };

  const handleRoomClick = (room: Room) => {
    if (room.id === 'Stair') {
      setFloor('ground');
      return;
    }
    if (!room.clickable) return;
    setSelectedRoom({ id: room.id, name: room.name, floor: -1 });
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
              }}>-1 Floor Plan</h1>
              <p className="text-sm font-medium tracking-widest uppercase" style={{ color: 'rgba(180,210,255,0.75)' }}>
                EduNav Campus Navigation System
              </p>
              <LiveDateTime />
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
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,215,0,0.7)', marginRight: '4px' }}>Floor</span>
            {floors.map(f => (
              <button
                key={f.value}
                onClick={() => setFloor(f.value as any)}
                style={{
                  padding: '5px 14px',
                  borderRadius: '999px',
                  fontSize: '12px',
                  fontWeight: 700,
                  border: f.value === 'minus1' ? '1.5px solid #ffd700' : '1.5px solid rgba(255,255,255,0.2)',
                  background: f.value === 'minus1' ? 'linear-gradient(135deg, #b8860b, #ffd700)' : 'rgba(255,255,255,0.08)',
                  color: f.value === 'minus1' ? '#1a1000' : 'rgba(255,255,255,0.75)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: f.value === 'minus1' ? '0 0 10px rgba(255,215,0,0.4)' : 'none',
                }}
              >{f.label}</button>
            ))}
          </div>
        </div>

        <div style={glassCard}>
          <div className="flex items-center gap-2 mb-3">
            <span style={{ display:'inline-block', width:8, height:8, borderRadius:'50%', background:'#ffd700', boxShadow:'0 0 6px #ffd700' }}/>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,215,0,0.75)' }}>Floor Map</span>
          </div>
          <div className="flex justify-center">
            <svg viewBox="0 0 888 420" className="rounded-xl" style={{ width: '90%', background: 'rgba(255,255,255,0.95)', boxShadow: '0 4px 24px rgba(0,0,0,0.3)', border: '1px solid rgba(255,215,0,0.15)' }}>
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ececec" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="888" height="420" fill="url(#grid)" />
              {rooms.map(room => {
                const isInteractive = room.clickable || room.isStair;
                return (
                  <g key={room.id} onClick={() => handleRoomClick(room)}
                    className={isInteractive ? 'transition-transform duration-200 hover:scale-105 active:scale-100 cursor-pointer' : 'cursor-default'}
                    style={isInteractive ? { transformBox: 'fill-box', transformOrigin: 'center' } : undefined}>
                    <rect x={room.x} y={room.y} width={room.width} height={room.height} fill={getRoomColor(room)} stroke={room.isStair ? '#8B4513' : '#64748b'} strokeWidth={room.isStair ? 3 : 1.5} rx="5" style={{ filter: room.isStair ? 'drop-shadow(0 0 4px rgba(139, 69, 19, 0.5))' : 'none' }} />
                    {room.isStair && (
                      <g>
                        {Array.from({ length: 6 }).map((_, i) => (
                          <rect key={i} x={room.x} y={room.y + i * (room.height / 6)} width={room.width} height={room.height / 7} fill="#6a4f0bff" stroke="#8b7500" strokeWidth="0.4" opacity="0.95" />
                        ))}
                      </g>
                    )}
                    {room.name && <text x={room.x + room.width / 2} y={room.y + room.height / 2} textAnchor="middle" dominantBaseline="middle" fontSize={room.width < 100 ? '10' : '13'} fontWeight="700" fill="#1e293b" pointerEvents="none" className="select-none">{room.name}</text>}
                    {room.clickable && (
                      <circle 
                        cx={room.x + room.width - 8} 
                        cy={room.y + 8} 
                        r="5" 
                        fill={roomStatuses[room.id.toLowerCase().replace(/\s+/g, '')] === true ? '#ef4444' : roomStatuses[room.id.toLowerCase().replace(/\s+/g, '')] === false ? '#22c55e' : '#94a3b8'} 
                        opacity="1" 
                        pointerEvents="none"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        <div style={glassCard}>
          <h2 className="text-lg font-bold mb-4" style={{ color: '#ffd700' }}>Legend</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {clickableRooms.map(room => (
              <div key={room.id} onClick={() => handleRoomClick(room)} className="flex items-center gap-3 p-3 rounded-xl transition-all" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,215,0,0.4)', cursor: 'pointer', backdropFilter: 'blur(6px)' }}>
                <div className="w-5 h-5 rounded flex-shrink-0" style={{ backgroundColor: room.color, border: '1px solid rgba(255,255,255,0.5)' }} />
                <span className="text-sm font-semibold" style={{ color: '#f0f4ff' }}>{room.name}</span>
                <span className="ml-auto text-xs" style={{ color: roomStatuses[room.id.toLowerCase().replace(/\s+/g, '')] === true ? '#ef4444' : roomStatuses[room.id.toLowerCase().replace(/\s+/g, '')] === false ? '#22c55e' : '#94a3b8' }}>●</span>
              </div>
            ))}
          </div>
        </div>
        <BookingModal room={selectedRoom} onClose={() => setSelectedRoom(null)} onSuccess={() => { setSelectedRoom(null); mutate(); }} />
        
        <div className="mt-4 text-center text-xs" style={{ color: 'rgba(180,210,255,0.4)' }}>
          Last updated: February 2026 | Interactive Floor Plan
        </div>
      </div>
    </div>
  );
}

export default MinusOneFloor;