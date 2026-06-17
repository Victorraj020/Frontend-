'use client';

import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';

interface HeroTileProps {
  streakDays?: number;
}

export default function HeroTile({ streakDays = 14 }: HeroTileProps) {
  const r1 = 48, r2 = 35;
  const c1 = 2 * Math.PI * r1;
  const c2 = 2 * Math.PI * r2;
  const pct = streakDays / 30;

  return (
    <article
      className="bento-card"
      style={{ padding: 24, height: '100%', minHeight: 200 }}
      aria-label="Welcome hero tile"
    >
      <div style={{
        position: 'relative', zIndex: 1,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        height: '100%',
      }}>
        {/* LEFT: text */}
        <div style={{ flex: '1 1 200px', minWidth: 0 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: '#7A7A90', marginBottom: 6 }}>
            Good morning
          </p>

          <h1 style={{ fontWeight: 700, color: '#F0F0F5', lineHeight: 1.2, fontSize: 'clamp(1.5rem, 5vw, 2rem)' }}>
            Welcome back, <span style={{ color: '#FF6B35' }}>Student</span>
          </h1>

          <p style={{ fontSize: 13, color: '#7A7A90', marginTop: 12 }}>
            You have{' '}
            <span style={{ color: '#FF6B35', fontWeight: 600 }}>3 lessons</span>
            {' '}scheduled for today.
          </p>
        </div>

        {/* RIGHT: Streak rings */}
        <div
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}
          aria-label={`${streakDays} day streak`}
        >
          <div style={{ position: 'relative' }}>
            <svg width="100" height="100" viewBox="0 0 112 112" aria-hidden="true">
              {/* Track */}
              <circle cx="56" cy="56" r={r1} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="6" />
              <circle cx="56" cy="56" r={r2} fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="4" />
              {/* Fill */}
              <motion.circle
                cx="56" cy="56" r={r1} fill="none" stroke="#FF6B35" strokeWidth="6"
                strokeLinecap="round" strokeDasharray={c1}
                initial={{ strokeDashoffset: c1 }}
                animate={{ strokeDashoffset: c1 - pct * c1 }}
                transition={{ delay: 0.2, duration: 1.0, ease: 'easeOut' }}
                transform="rotate(-90 56 56)"
              />
              <motion.circle
                cx="56" cy="56" r={r2} fill="none" stroke="#FF3CAC" strokeWidth="4"
                strokeLinecap="round" strokeDasharray={c2}
                initial={{ strokeDashoffset: c2 }}
                animate={{ strokeDashoffset: c2 - pct * c2 * 0.75 }}
                transition={{ delay: 0.3, duration: 0.9, ease: 'easeOut' }}
                transform="rotate(-90 56 56)"
              />
            </svg>
            {/* Center label */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1,
            }}>
              <Flame size={16} color="#FF6B35" fill="#FF6B35" />
              <span style={{ fontSize: 20, fontWeight: 700, color: '#F0F0F5', lineHeight: 1 }}>{streakDays}</span>
              <span style={{ fontSize: 9, color: '#7A7A90' }}>days</span>
            </div>
          </div>
          <p style={{ fontSize: 10, fontWeight: 600, color: '#FF6B35' }}>Active Streak</p>
        </div>
      </div>
    </article>
  );
}
