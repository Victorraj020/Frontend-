'use client';

import { motion } from 'framer-motion';
import { useMemo } from 'react';

function generateHeatmapData(): number[] {
  // Fixed seed pattern so SSR and client match
  return Array.from({ length: 84 }, (_, i) => {
    const v = (i * 7 + 13) % 17;
    if (v < 3) return 0;
    if (v < 7) return 1;
    if (v < 11) return 2;
    if (v < 14) return 3;
    return 4;
  });
}

const intensityColors = [
  'rgba(255,255,255,0.04)',
  'rgba(255,107,53,0.18)',
  'rgba(255,107,53,0.38)',
  'rgba(255,107,53,0.62)',
  '#FF6B35',
];

const weeklyHours = [3, 6, 4, 8, 5, 7, 4];
const dayLabels   = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const maxH = Math.max(...weeklyHours);

export default function ActivityTile() {
  const heatmapData = useMemo(() => generateHeatmapData(), []);
  return (
    <article
      className="bento-card"
      style={{ padding: 24, height: '100%' }}
      aria-label="Learning activity heatmap and weekly chart"
    >
      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 20, height: '100%' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 14, fontWeight: 700, color: '#F0F0F5' }}>Learning Activity</h2>
          <span style={{ fontSize: 12, color: '#6B6B80' }}>Last 12 weeks</span>
        </div>

        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', flex: 1 }}>
          {/* Heatmap */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 4 }}>
              {heatmapData.map((intensity, i) => (
                <motion.div
                  key={i}
                  className="heatmap-cell"
                  style={{ width: '14px', height: '14px', background: intensityColors[intensity] }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05 + i * 0.004, duration: 0.18, type: 'spring', stiffness: 400, damping: 20 }}
                />
              ))}
            </div>
            {/* Legend */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 10 }}>
              <span style={{ fontSize: 10, color: '#6B6B80' }}>Less</span>
              {intensityColors.map((c, i) => (
                <div key={i} className="heatmap-cell" style={{ width: '12px', height: '12px', background: c }} />
              ))}
              <span style={{ fontSize: 10, color: '#6B6B80' }}>More</span>
            </div>
          </div>

          {/* Weekly bar chart */}
          <div style={{ flex: 1, minWidth: 120 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#6B6B80', marginBottom: 12 }}>This Week (hrs)</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 70 }}>
              {weeklyHours.map((h, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, flex: 1, height: '100%' }}>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                    <div style={{ width: '100%', background: 'rgba(255,255,255,0.04)', borderRadius: 4, overflow: 'hidden', height: '100%', display: 'flex', alignItems: 'flex-end' }}>
                      <motion.div
                        style={{
                          width: '100%',
                          borderRadius: 4,
                          background: i === 4 ? '#FF6B35' : 'rgba(255, 107, 53, 0.35)',
                        }}
                        initial={{ height: 0 }}
                        animate={{ height: `${(h / maxH) * 100}%` }}
                        transition={{ delay: 0.4 + i * 0.07, duration: 0.55, ease: 'easeOut' }}
                      />
                    </div>
                  </div>
                  <span style={{ fontSize: 10, color: '#6B6B80' }}>{dayLabels[i]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
