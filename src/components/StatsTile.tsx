'use client';

import { motion } from 'framer-motion';
import { BookOpen, CheckCircle2, Clock } from 'lucide-react';

const stats = [
  { label: 'Active Courses', value: '4', icon: BookOpen, color: '#FF6B35', bg: 'rgba(255,107,53,0.12)' },
  { label: 'Completed', value: '12', icon: CheckCircle2, color: '#FF3CAC', bg: 'rgba(255,60,172,0.12)' },
  { label: 'Hours / week', value: '8.5', icon: Clock, color: '#9B7FE8', bg: 'rgba(155,127,232,0.12)' },
];

export default function StatsTile() {
  return (
    <article
      className="bento-card"
      style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 12, height: '100%' }}
      aria-label="Learning statistics"
    >
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B6B80' }}>
        Quick Stats
      </p>

      <ul style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1, justifyContent: 'center' }} role="list">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.li
              key={stat.label}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.35 }}
              style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative', zIndex: 1 }}
            >
              <div style={{
                width: 34, height: 34, borderRadius: 10, background: stat.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon size={15} color={stat.color} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 11, color: '#6B6B80', lineHeight: 1 }}>{stat.label}</p>
              </div>
              <span style={{ fontSize: 20, fontWeight: 800, color: '#F0F0F5' }}>{stat.value}</span>
            </motion.li>
          );
        })}
      </ul>
    </article>
  );
}
