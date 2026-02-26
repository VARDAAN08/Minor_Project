'use client'

import React, { useState } from 'react';

type DoorPosition = 'top' | 'bottom' | 'left' | 'right';

interface DoorSpec {
  position: DoorPosition;
  width?: number; // visual slab width (for top/bottom) or thickness (for left/right)
  height?: number; // visual slab height (for left/right) or thickness (for top/bottom)
  offset?: number; // offset from center (positive moves right/down)
  interactive?: boolean;
  // Optional absolute coordinates for manual placement (top-left of the cutout)
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
  stairDirection?: number; // +1 for up, -1 for down
  door?: DoorPosition | DoorSpec | Array<DoorPosition | DoorSpec>;
}

interface FirstfloorProps {
  onFloorChange?: (direction: number) => void;
}

function Firstfloor({ onFloorChange }: FirstfloorProps) {
  const [selectedRooms, setSelectedRooms] = useState<Set<string>>(new Set());

  const toggleRoom = (roomId: string) => {
    setSelectedRooms(prev => {
      const newSet = new Set(prev);
      if (newSet.has(roomId)) {
        newSet.delete(roomId);
      } else {
        newSet.add(roomId);
      }
      return newSet;
    });
  };

  const rooms: Room[] = [
    // Top row - 1st Floor
    { id: 'cl9', name: 'CL 9', x: 20, y: 10, width: 90, height: 110, color: '#f3e5f5', door: [{ position: 'right', offset: +27 }] },
    { id: 'placement-cell', name: 'T & P Cell', x: 110, y: 55, width: 60, height: 35, color: '#fff3e0', door: 'right' },
    { id: 'pharma-cell', name: 'HR Office', x: 110, y: 10, width: 60, height: 45, color: '#fff3e0', door: 'right' },
    { id: 'washroom-boys', name: 'BW', x: 170, y: 10, width: 50, height: 35, color: '#e0f2f1', door: 'right' },
    { id: 'lift', name: 'Lift', x: 170, y: 45, width: 50, height: 18, color: '#ede7f6' },
    
    { id: 'cL-10-11', name: 'CL 10 & 11', x: 250, y: 10, width: 160, height: 37, color: '#f3e5f5', door: 'bottom' },
    { id: 'tr1', name: 'TR 1', x: 250, y: 50, width: 68, height: 35, color: '#e3f2fd', door: 'bottom' },
    { id: 'tr2', name: 'TR 2', x: 320, y: 50, width: 68, height: 35, color: '#e3f2fd', door: 'bottom' },
    // Stair below TR2 - goes down to ground floor
    { id: 'Stair-BW', name: 'Stair ↓', x: 250, y: 107, width: 120, height: 20, color: '#d4af37', isStair: true, stairDirection: -1 },
    
    { id: 'board-room', name: 'Board Room', x: 410, y: 10, width: 100, height: 37, color: '#f1f8e9', door: 'bottom' },
    { id: 'staff-room', name: 'Staff Room', x: 510, y: 10, width: 110, height: 37, color: '#fce4ec', door: 'bottom' },
    
    { id: 'tr3', name: 'TR 3', x: 510, y: 50, width: 53, height: 35, color: '#e3f2fd', door: 'bottom' },
    { id: 'tr4', name: 'TR 4', x: 565, y: 50, width: 53, height: 35, color: '#e3f2fd', door: 'bottom' },
    
    { id: 'lobby', name: 'Lobby', x: 620, y: 10, width: 58, height: 80, color: '#f0f4c3' },
    // Stair downside of Lobby - goes up to second floor
    { id: 'Stair-Lobby', name: 'Stair ↑', x: 510, y: 107, width: 120, height: 20, color: '#d4af37', isStair: true, stairDirection: 1 },
    
    { id: 'cr9', name: 'CR 9', x: 680, y: 10, width: 90, height: 80, color: '#c8e6c9', door: [{ position: 'bottom', offset: -20 }, { position: 'bottom', offset: 20 }] },
    { id: 'cr10', name: 'CR 10', x: 770, y: 10, width: 90, height: 80, color: '#c8e6c9', door: [{ position: 'bottom', offset: -20 }, { position: 'bottom', offset: 20 }] },

    // Middle area - gaps become corridors, corridors become blank
    { id: 'corridor-gap1', name: 'Corridor', x: 180, y: 130, width: 70, height: 120, color: '#f5f5f5' },
    { id: 'corridor-gap2', name: 'Corridor', x: 630, y: 130, width: 50, height: 120, color: '#f5f5f5' },
    
    // Light grey blank spaces with boundary (former corridor areas)
    { id: 'space-left', name: '', x: 20, y: 130, width: 160, height: 120, color: '#e0e0e0' },
    { id: 'space-middle', name: '', x: 250, y: 130, width: 380, height: 120, color: '#e0e0e0' },
    { id: 'space-right', name: '', x: 680, y: 130, width: 180, height: 120, color: '#e0e0e0' },

    // Bottom section
    { id: 'lt3', name: 'LT 3', x: 20, y: 250, width: 100, height: 140, color: '#e1f5fe', door: 'right' },
    { id: 'cr8', name: 'CR 8', x: 200, y: 260, width: 80, height: 130, color: '#c8e6c9', door: 'top' },
    { id: 'cr7', name: 'CR 7', x: 280, y: 260, width: 80, height: 130, color: '#c8e6c9', door: 'top' },
    
    { id: 'cr6', name: 'CR 6', x: 460, y: 260, width: 80, height: 130, color: '#c8e6c9', door: 'top' },
    { id: 'cr5', name: 'CR 5', x: 540, y: 260, width: 80, height: 130, color: '#c8e6c9', door: 'top' },
    { id: 'gw', name: 'GW', x: 620, y: 320, width: 70, height: 70, color: '#e0f2f1' },
    
    { id: 'lab1', name: 'PHY. LAB1', x: 700, y: 260, width: 80, height: 130, color: '#ffecb3', door: 'top' },
    { id: 'lab2', name: 'ECL 6', x: 780, y: 260, width: 80, height: 130, color: '#ffecb3', door: 'top' },
    
    // Mughal Garden area
    { id: 'mughal-garden', name: 'Mughal Garden', x: 20, y: 390, width: 840, height: 130, color: '#d4edda' },
  ];

  const isSelectableRoom = (roomId: string) => {
    // Only TR, CR, LT, Labs, CL, and Board Room are selectable
    return roomId.toLowerCase().startsWith('tr') || 
           roomId.toLowerCase().startsWith('cr') || 
           roomId.toLowerCase().startsWith('lt') || 
           roomId.toLowerCase().startsWith('lab') ||
           roomId.toLowerCase().startsWith('cl') ||
           roomId.toLowerCase().includes('board');
  };

  const getRoomColor = (room:Room) => {
    if (isSelectableRoom(room.id) && selectedRooms.has(room.id)) {
      return '#ffd54f';
    }
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
    let y = room.y - slabH / 2 + (pos === 'left' || pos === 'right' ? 0 : 0);

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

    // Render a small centered box instead of a door slab + swing
    // If the spec contains explicit coordinates, use them (manual placement)
    const userX = spec.x;
    const userY = spec.y;
    const boxW = spec.width ?? Math.min(16, slabW);
    const boxH = spec.height ?? Math.min(12, slabH);

    let bx: number;
    let by: number;

    if (typeof userX === 'number' && typeof userY === 'number') {
      // user provided absolute top-left coordinates for the cutout
      bx = userX;
      by = userY;
    } else {
      // center the cutout within the computed slab area
      const cx = x + slabW / 2;
      const cy = y + slabH / 2;
      bx = cx - boxW / 2;
      by = cy - boxH / 2;
    }

    // Draw a cutout-looking box: filled with the SVG background pattern so it appears as a gap
    return (
      <g key={key} pointerEvents={pointer as any} aria-hidden={!interactive}>
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
        {/* small jamb lines to make it read like a doorway */}
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">First Floor Plan</h1>
          <p className="text-lg text-slate-600">EduNav Campus Navigation System</p>
        </div>

        {/* Main Container */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          {/* SVG Floor Plan */}
          <div className="flex justify-center">
            <svg viewBox="0 0 880 530" className="w-full border-2 border-slate-300 rounded-lg bg-white shadow-md" style={{ aspectRatio: '880/530' }}>
              {/* Background Pattern */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="880" height="530" fill="url(#grid)" />

              {/* Building outline */}
              <rect x="10" y="10" width="860" height="510" fill="none" stroke="#999" strokeWidth="2" strokeDasharray="10,5" opacity="0.5" />

              {/* Floor label */}
              <text x="440" y="35" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#666" opacity="0.4">
                1st Floor
              </text>

              {/* Transparent box around CL 9, HR Office, and T & P Cell */}
              <rect
                x={18}
                y={18}
                width={154}
                height={104}
                fill="transparent"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="5,3"
                rx="4"
                opacity="0.8"
              />

              {/* Render all rooms */}
              {rooms.map(room => {
                return (
                  <g key={room.id}>
                    {/* Room rectangle */}
                    <rect
                      x={room.x}
                      y={room.y}
                      width={room.width}
                      height={room.height}
                      fill={getRoomColor(room)}
                      stroke={isSelectableRoom(room.id) && selectedRooms.has(room.id) ? '#ff6b6b' : room.isStair ? '#8B4513' : '#475569'}
                      strokeWidth={isSelectableRoom(room.id) && selectedRooms.has(room.id) ? '3' : room.isStair ? '3' : '2'}
                      rx="3"
                      className={isSelectableRoom(room.id) || room.isStair ? "cursor-pointer transition-all duration-200 hover:opacity-80" : "cursor-default"}
                      onClick={() => {
                        if (room.isStair && room.stairDirection && onFloorChange) {
                          onFloorChange(room.stairDirection);
                        } else if (isSelectableRoom(room.id)) {
                          toggleRoom(room.id);
                        }
                      }}
                      style={{
                        filter: isSelectableRoom(room.id) && selectedRooms.has(room.id) ? 'drop-shadow(0 0 8px rgba(255, 107, 107, 0.5))' : room.isStair ? 'drop-shadow(0 0 4px rgba(139, 69, 19, 0.5))' : 'none'
                      }}
                    />

                    {/* Render doors */}
                    {room.door && renderDoor(room)}

                    {/* Stair pattern: render as steps. If the stair area is wider than tall, render horizontal risers (left->right). Otherwise render vertical stacked steps (bottom->top). */}
                    {room.isStair && (
                      (() => {
                        // Horizontal stairs when width > height (e.g., 'Stair-2')
                        if (room.width > room.height) {
                          const steps = Math.max(4, Math.floor(room.width / 12));
                          const stepWidth = room.width / steps;
                          const riserWidth = Math.max(2, stepWidth - 2);
                          const stepHeightOffset = room.height / steps;
                          const baseY = room.y + room.height; // bottom baseline

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

                        // Default: vertical stacked steps (original behavior)
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

                    {/* Room label */}
                    {room.name && (
                      <text
                        x={room.x + room.width / 2}
                        y={room.y + room.height / 2}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="font-bold select-none"
                        fontSize={room.width < 80 ? '10' : '12'}
                        fill="#1f2937"
                        pointerEvents="none"
                      >
                        {room.name}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Border lines for reference */}
              <line x1="10" y1="10" x2="870" y2="10" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="10" y1="520" x2="870" y2="520" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="10" y1="10" x2="10" y2="520" stroke="#cbd5e1" strokeWidth="1" />
              <line x1="870" y1="10" x2="870" y2="520" stroke="#cbd5e1" strokeWidth="1" />
            </svg>
          </div>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">Legend</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {rooms.map(room => (
              <div
                key={room.id}
                className={isSelectableRoom(room.id) ? "flex items-center gap-2 p-2 rounded-lg border border-slate-200 cursor-pointer hover:border-slate-400 transition-all" : "flex items-center gap-2 p-2 rounded-lg border border-slate-200 cursor-default opacity-50"}
                onClick={() => {
                  if (isSelectableRoom(room.id)) {
                    toggleRoom(room.id);
                  }
                }}
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
        {selectedRooms.size > 0 && (
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
            <h2 className="text-xl font-bold text-slate-800 mb-4">Selected Rooms ({selectedRooms.size})</h2>
            <div className="space-y-3">
              {rooms.filter(room => selectedRooms.has(room.id)).map(room => (
                <div key={room.id} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                  <div
                    className="w-8 h-8 rounded border-2 border-slate-300"
                    style={{ backgroundColor: room.color }}
                  />
                  <p><span className="font-bold text-slate-700">Name:</span> <span className="text-slate-600 text-lg">{room.name}</span></p>
                </div>
              ))}
            </div>
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

export default Firstfloor;