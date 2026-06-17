'use client';

import { motion } from 'framer-motion';
import { Flame, Trophy, BookOpen, Zap } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import type { Course } from '@/lib/supabase';

const iconColorMap: Record<string, { color: string; bg: string }> = {
  Code2:    { color: '#FF6B35', bg: 'rgba(255,107,53,0.14)' },
  Server:   { color: '#FF3CAC', bg: 'rgba(255,60,172,0.14)' },
  FileCode: { color: '#9B7FE8', bg: 'rgba(155,127,232,0.14)' },
  Palette:  { color: '#20C997', bg: 'rgba(32,201,151,0.14)' },
  BookOpen: { color: '#FF6B35', bg: 'rgba(255,107,53,0.14)' },
  Cpu:      { color: '#FF3CAC', bg: 'rgba(255,60,172,0.14)' },
  Database: { color: '#9B7FE8', bg: 'rgba(155,127,232,0.14)' },
  Globe:    { color: '#20C997', bg: 'rgba(32,201,151,0.14)' },
};

const MILESTONES = [0, 25, 50, 75, 100];

function CourseProgressRow({ course, index }: { course: Course; index: number }) {
  const { color, bg } = iconColorMap[course.icon_name] ?? { color: '#FF6B35', bg: 'rgba(255,107,53,0.14)' };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[course.icon_name] as React.ComponentType<{ size?: number; color?: string }> | undefined;

  return (
    <motion.div
      className="bento-card"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4, type: 'spring', stiffness: 260, damping: 24 }}
      style={{ padding: 20 }}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 38, height: 38, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {Icon ? <Icon size={17} color={color} /> : <BookOpen size={17} color={color} />}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: '#F0F0F5', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {course.title}
            </h3>
            <p style={{ fontSize: 12, color: '#6B6B80', marginTop: 2 }}>
              {course.progress === 100 ? '✓ Completed' : `${Math.round((100 - course.progress) * 0.3)} lessons left`}
            </p>
          </div>
          <span style={{ fontSize: 24, fontWeight: 800, color, fontVariantNumeric: 'tabular-nums' }}>
            {course.progress}%
          </span>
        </div>

        {/* Progress track with milestones */}
        <div style={{ position: 'relative' }}>
          <div className="progress-track" style={{ height: 8 }}>
            <motion.div
              className="progress-fill"
              style={{ background: `linear-gradient(90deg, ${color}, #FF3CAC)`, height: '100%' }}
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{ delay: 0.4 + index * 0.08, duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          </div>

          {/* Milestone dots */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 8, pointerEvents: 'none' }}>
            {MILESTONES.slice(1, -1).map((m) => (
              <div
                key={m}
                style={{
                  position: 'absolute', left: `${m}%`, top: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 6, height: 6, borderRadius: '50%',
                  background: course.progress >= m ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.15)',
                  border: '1px solid rgba(0,0,0,0.4)',
                  zIndex: 2,
                }}
              />
            ))}
          </div>
        </div>

        {/* Milestone labels */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          {MILESTONES.map((m) => (
            <span key={m} style={{ fontSize: 10, color: course.progress >= m ? '#6B6B80' : '#2A2A38' }}>
              {m}%
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

interface ProgressClientProps {
  courses: Course[];
}

export default function ProgressClient({ courses }: ProgressClientProps) {
  const totalProgress = Math.round(courses.reduce((sum, c) => sum + c.progress, 0) / (courses.length || 1));
  const totalXP = courses.reduce((sum, c) => sum + Math.round(c.progress * 12), 0);
  const completed = courses.filter(c => c.progress === 100).length;

  const summaryStats = [
    { label: 'Avg. Progress', value: `${totalProgress}%`, icon: Zap,       color: '#FF6B35', bg: 'rgba(255,107,53,0.12)' },
    { label: 'Total XP',      value: totalXP.toLocaleString(), icon: Trophy, color: '#9B7FE8', bg: 'rgba(155,127,232,0.12)' },
    { label: 'Completed',     value: `${completed}/${courses.length}`, icon: BookOpen, color: '#20C997', bg: 'rgba(32,201,151,0.12)' },
    { label: 'Day Streak',    value: '14',    icon: Flame,  color: '#FF3CAC', bg: 'rgba(255,60,172,0.12)' },
  ];

  return (
    <>
      {/* Summary stat cards */}
      <div className="stats-grid" style={{ marginBottom: 24 }}>
        {summaryStats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              className="bento-card"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.35 }}
              style={{ padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 16 }}
            >
              <div style={{ width: 44, height: 44, borderRadius: 14, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={20} color={s.color} />
              </div>
              <div>
                <p style={{ fontSize: 26, fontWeight: 800, color: '#F0F0F5', lineHeight: 1 }}>{s.value}</p>
                <p style={{ fontSize: 12, color: '#6B6B80', marginTop: 4 }}>{s.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Overall ring */}
      <motion.div
        className="bento-card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        style={{ padding: 28, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 28 }}
      >
        {/* Big ring */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <svg width="100" height="100" viewBox="0 0 100 100" aria-hidden="true">
            <defs>
              <linearGradient id="prog-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6B35" />
                <stop offset="100%" stopColor="#FF3CAC" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
            <motion.circle
              cx="50" cy="50" r="42" fill="none" stroke="url(#prog-grad)" strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 42}
              initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - totalProgress / 100) }}
              transition={{ delay: 0.5, duration: 1.2, ease: 'easeOut' }}
              transform="rotate(-90 50 50)"
              style={{ filter: 'drop-shadow(0 0 6px rgba(255,107,53,0.5))' }}
            />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 0 }}>
            <span style={{ fontSize: 22, fontWeight: 800, color: '#F0F0F5' }}>{totalProgress}%</span>
            <span style={{ fontSize: 10, color: '#6B6B80' }}>overall</span>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#F0F0F5', marginBottom: 6 }}>Overall Learning Progress</h2>
          <p style={{ fontSize: 13, color: '#6B6B80', lineHeight: 1.6 }}>
            You have completed <span style={{ color: '#FF6B35', fontWeight: 700 }}>{totalProgress}%</span> of your enrolled curriculum.
            Keep up the momentum — you&apos;re doing great!
          </p>
          <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px',
              background: 'rgba(255,107,53,0.1)', border: '1px solid rgba(255,107,53,0.25)',
              borderRadius: 99, fontSize: 12, fontWeight: 600, color: '#FF6B35',
            }}>
              🔥 14-day streak
            </div>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 12px',
              background: 'rgba(155,127,232,0.1)', border: '1px solid rgba(155,127,232,0.25)',
              borderRadius: 99, fontSize: 12, fontWeight: 600, color: '#9B7FE8',
            }}>
              ⚡ {totalXP.toLocaleString()} XP earned
            </div>
          </div>
        </div>
      </motion.div>

      {/* Per-course rows */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F0F0F5', marginBottom: 4 }}>Course Breakdown</h2>
        {courses.map((course, i) => (
          <CourseProgressRow key={course.id} course={course} index={i} />
        ))}
      </div>
    </>
  );
}
