'use client';

import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';

const upcoming = [
  { id: 1, title: 'React Server Components Deep Dive', course: 'Advanced React', duration: '25 min', color: '#FF6B35' },
  { id: 2, title: 'CAP Theorem & Distributed Systems',  course: 'System Design',  duration: '18 min', color: '#FF3CAC' },
  { id: 3, title: 'Advanced TypeScript Generics',       course: 'TypeScript',      duration: '32 min', color: '#9B7FE8' },
];

export default function UpcomingTile() {
  return (
    <article
      className="bento-card"
      style={{ padding: 24, height: '100%' }}
      aria-label="Upcoming lessons"
    >
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: '#F0F0F5' }}>Up Next</h2>
          <button
            style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600, color: '#FF6B35', background: 'none', border: 'none', cursor: 'pointer' }}
            aria-label="See all upcoming lessons"
          >
            See all <ArrowRight size={12} />
          </button>
        </div>

        {/* Lessons */}
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }} role="list">
          {upcoming.map((lesson, i) => (
            <motion.li
              key={lesson.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.35 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', borderRadius: 12,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
                transition: 'background 0.15s ease',
                cursor: 'pointer',
              }}
            >
              {/* Left accent bar */}
              <div style={{
                width: 3, height: 40, borderRadius: 99, flexShrink: 0,
                background: lesson.color,
              }} />

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#F0F0F5', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {lesson.title}
                </p>
                <span style={{
                  display: 'inline-block', marginTop: 4, fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 6,
                  background: `${lesson.color}18`, color: lesson.color,
                  border: `1px solid ${lesson.color}30`,
                }}>
                  {lesson.course}
                </span>
              </div>

              {/* Duration */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
                <Clock size={12} color="#6B6B80" />
                <span style={{ fontSize: 12, color: '#6B6B80' }}>{lesson.duration}</span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </article>
  );
}
