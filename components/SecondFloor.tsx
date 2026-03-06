'use client'

import React from 'react';

function SecondFloor({ setFloor }: { setFloor: (floor: 'minus1' | 'ground' | 'first' | 'second' | 'third' | 'fourth') => void }) {

  const floors = [
    { value: 'minus1', label: '-1 Floor' },
    { value: 'ground', label: 'Ground' },
    { value: 'first',  label: '1st Floor' },
    { value: 'second', label: '2nd Floor' },
    { value: 'third',  label: '3rd Floor' },
    { value: 'fourth', label: '4th Floor' },
  ];

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

      {/* Layer 1 — Campus image */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: 'url("/juitpit2.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'brightness(0.45) saturate(1.2) contrast(1.1)',
        zIndex: 0,
      }} />

      {/* Layer 2 — Deep blue gradient overlay */}
      <div style={{
        position: 'fixed', inset: 0,
        background: 'linear-gradient(135deg, rgba(5,15,45,0.55) 0%, rgba(10,30,80,0.45) 50%, rgba(20,10,50,0.55) 100%)',
        zIndex: 1,
      }} />

      {/* Gold top accent bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #b8860b, #ffd700, #f0c040, #ffd700, #b8860b)',
        zIndex: 10,
        boxShadow: '0 0 12px rgba(255,215,0,0.6)',
      }} />

      {/* Content */}
      <div className="max-w-7xl mx-auto pt-2" style={{ position: 'relative', zIndex: 5 }}>

        {/* Header */}
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

          {/* Pill Button Floor Switcher */}
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
                  border: f.value === 'second'
                    ? '1.5px solid #ffd700'
                    : '1.5px solid rgba(255,255,255,0.2)',
                  background: f.value === 'second'
                    ? 'linear-gradient(135deg, #b8860b, #ffd700)'
                    : 'rgba(255,255,255,0.08)',
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

        {/* NOT READY Card */}
        <div style={glassCard}>
          <div className="flex items-center gap-2 mb-3">
            <span style={{ display:'inline-block', width:8, height:8, borderRadius:'50%', background:'#ffd700', boxShadow:'0 0 6px #ffd700' }}/>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'rgba(255,215,0,0.75)' }}>Floor Map</span>
          </div>

          <div className="flex justify-center">
            <svg
              viewBox="0 0 880 500"
              className="rounded-xl"
              style={{
                width: '90%',
                display: 'block',
                margin: '0 auto',
                border: '1px solid rgba(255,215,0,0.15)',
                background: 'rgba(255,255,255,0.95)',
                aspectRatio: '880/500',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
              }}
            >
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#ececec" strokeWidth="0.5"/>
                </pattern>
                <pattern id="barricadeStripes" x="0" y="0" width="28" height="28"
                  patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                  <rect width="14" height="28" fill="rgba(255,185,0,0.18)" />
                  <rect x="14" width="14" height="28" fill="rgba(0,0,0,0.08)" />
                </pattern>
                <filter id="badgeShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="2" dy="3" stdDeviation="4" floodColor="rgba(0,0,0,0.45)" />
                </filter>
              </defs>

              {/* Grid base */}
              <rect width="880" height="500" fill="url(#grid)" />

              {/* Stripe overlay */}
              <rect x="10" y="10" width="860" height="480" fill="url(#barricadeStripes)" rx="4" />

              {/* Light red tint */}
              <rect x="10" y="10" width="860" height="480" fill="rgba(200,0,0,0.04)" rx="4" />

              {/* Corner warning triangles */}
              {[[30,15],[838,15],[30,466],[838,466]].map(([x,y], i) => (
                <g key={i} transform={`translate(${x}, ${y})`}>
                  <polygon points="14,0 28,24 0,24" fill="rgba(255,185,0,0.9)" stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" />
                  <text x="14" y="19" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#333">!</text>
                </g>
              ))}

              {/* Central NOT READY badge */}
              <g transform="translate(440, 250) rotate(-12)" filter="url(#badgeShadow)">
                <rect x="-175" y="-45" width="350" height="90" rx="10" fill="rgba(180,15,15,0.93)" />
                <rect x="-167" y="-37" width="334" height="74" rx="7" fill="none"
                  stroke="rgba(255,255,255,0.75)" strokeWidth="3" />
                <text textAnchor="middle" dominantBaseline="middle"
                  fontSize="48" fontWeight="900"
                  fontFamily="Impact, Arial Black, sans-serif"
                  fill="white" letterSpacing="5">
                  NOT READY
                </text>
              </g>

              {/* Floor label */}
              <text x="440" y="460" textAnchor="middle" fontSize="16"
                fontWeight="bold" fill="#94a3b8" opacity="0.6">
                2nd Floor — Coming Soon
              </text>
            </svg>
          </div>
        </div>

        {/* Info card */}
        <div style={{
          ...glassCard,
          border: '1px solid rgba(255,185,0,0.4)',
          borderLeft: '4px solid #ffd700',
        }}>
          <div className="flex items-center gap-3">
            <span style={{ fontSize: '28px' }}>🚧</span>
            <div>
              <h2 className="text-lg font-bold mb-1" style={{ color: '#ffd700' }}>
                Floor Map Under Construction
              </h2>
              <p className="text-sm" style={{ color: 'rgba(200,220,255,0.7)' }}>
                The 2nd Floor map is currently being prepared. Please use the floor switcher above to navigate to available floors.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-xs" style={{ color: 'rgba(180,210,255,0.4)' }}>
          Last updated: February 2026 | Interactive Floor Plan
        </div>
      </div>
    </div>
  );
}

export default SecondFloor;