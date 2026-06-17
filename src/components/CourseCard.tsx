'use client';

import { motion } from 'framer-motion';
import * as LucideIcons from 'lucide-react';
import { BookOpen } from 'lucide-react';
import type { Course } from '@/lib/supabase';

interface CourseCardProps {
  course: Course;
}

const iconColorMap: Record<string, { color: string; bg: string }> = {
  Code2:    { color: '#FF6B35', bg: 'rgba(255,107,53,0.1)' },
  Server:   { color: '#FF3CAC', bg: 'rgba(255,60,172,0.1)' },
  FileCode: { color: '#9B7FE8', bg: 'rgba(155,127,232,0.1)' },
  Palette:  { color: '#20C997', bg: 'rgba(32,201,151,0.1)' },
};

export default function CourseCard({ course }: CourseCardProps) {
  const { color, bg } = iconColorMap[course.icon_name] ?? { color: '#FF6B35', bg: 'rgba(255,107,53,0.1)' };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[course.icon_name] as React.ComponentType<{ size?: number; color?: string }> | undefined;

  return (
    <article
      className="bento-card"
      style={{
        padding: 20,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 16,
        background: `radial-gradient(circle at 0% 0%, ${color}0c 0%, transparent 60%), var(--color-surface)`,
      }}
      aria-label={`Course: ${course.title}`}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
        <div style={{
          width: 38, height: 38, borderRadius: 10, background: bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          {Icon ? <Icon size={18} color={color} /> : <BookOpen size={18} color={color} />}
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: '#7A7A90' }}>
          {course.progress}%
        </span>
      </div>

      <div>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: '#F0F0F5', lineHeight: 1.35, marginBottom: 4 }}>
          {course.title}
        </h3>
        <p style={{ fontSize: 11, color: '#7A7A90' }}>In progress</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div className="progress-track" style={{ height: 4 }}>
          <motion.div
            className="progress-fill"
            style={{ width: `${course.progress}%`, background: color }}
            initial={{ width: 0 }}
            animate={{ width: `${course.progress}%` }}
            transition={{ delay: 0.1, duration: 0.8 }}
          />
        </div>
      </div>
    </article>
  );
}
