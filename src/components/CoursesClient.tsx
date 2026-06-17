'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import { Search, Filter, CheckCircle2, Clock3, ArrowRight, BookOpen } from 'lucide-react';
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

const FILTERS = ['All', 'In Progress', 'Completed'] as const;
type Filter = typeof FILTERS[number];

function CourseFullCard({ course, index }: { course: Course; index: number }) {
  const { color, bg } = iconColorMap[course.icon_name] ?? { color: '#FF6B35', bg: 'rgba(255,107,53,0.14)' };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Icon = (LucideIcons as any)[course.icon_name] as React.ComponentType<{ size?: number; color?: string }> | undefined;
  const isCompleted = course.progress === 100;

  return (
    <motion.article
      className="bento-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{ delay: index * 0.06, duration: 0.35, type: 'spring', stiffness: 280, damping: 24 }}
      whileHover={{ scale: 1.012, boxShadow: `0 8px 40px ${color}18` }}
      style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 14, background: bg,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          {Icon ? <Icon size={20} color={color} /> : <BookOpen size={20} color={color} />}
        </div>
        {isCompleted ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: '#20C997' }}>
            <CheckCircle2 size={14} /> Completed
          </div>
        ) : (
          <span style={{
            fontSize: 22, fontWeight: 800, color,
            fontVariantNumeric: 'tabular-nums',
          }}>{course.progress}%</span>
        )}
      </div>

      {/* Title & meta */}
      <div style={{ flex: 1 }}>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: '#F0F0F5', lineHeight: 1.4, marginBottom: 6 }}>
          {course.title}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Clock3 size={12} color="#6B6B80" />
          <span style={{ fontSize: 12, color: '#6B6B80' }}>
            {Math.round((100 - course.progress) * 0.3)} lessons remaining
          </span>
        </div>
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div className="progress-track">
          <motion.div
            className="progress-fill"
            style={{ background: isCompleted ? `linear-gradient(90deg, #20C997, #0EA5E9)` : `linear-gradient(90deg, ${color}, #FF3CAC)` }}
            initial={{ width: 0 }}
            animate={{ width: `${course.progress}%` }}
            transition={{ delay: 0.3 + index * 0.05, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>
      </div>

      {/* CTA */}
      <button
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          padding: '9px 0', borderRadius: 10, border: `1px solid ${color}30`,
          background: `${color}0E`, color, fontSize: 13, fontWeight: 700,
          cursor: 'pointer', transition: 'background 0.15s ease',
          width: '100%',
        }}
        aria-label={`Continue ${course.title}`}
      >
        {isCompleted ? 'Review' : 'Continue'} <ArrowRight size={14} />
      </button>
    </motion.article>
  );
}

interface CoursesClientProps {
  courses: Course[];
  isLive: boolean;
}

export default function CoursesClient({ courses, isLive }: CoursesClientProps) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('All');

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
      const matchFilter =
        filter === 'All' ? true :
        filter === 'Completed' ? c.progress === 100 :
        c.progress < 100;
      return matchSearch && matchFilter;
    });
  }, [courses, search, filter]);

  const inProgressCount = courses.filter(c => c.progress < 100 && c.progress > 0).length;
  const completedCount  = courses.filter(c => c.progress === 100).length;

  return (
    <>
      {!isLive && (
        <div style={{
          marginBottom: 20, padding: '10px 16px', borderRadius: 12,
          background: 'rgba(255,107,53,0.08)', border: '1px solid rgba(255,107,53,0.2)',
          fontSize: 12, fontWeight: 600, color: '#FF6B35',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          ⚡ Demo mode — add your Supabase URL + key to .env.local to load real courses
        </div>
      )}

      {/* Stats row */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        {[
          { label: 'Total Courses', value: courses.length, color: '#FF6B35' },
          { label: 'In Progress',   value: inProgressCount, color: '#FF3CAC' },
          { label: 'Completed',     value: completedCount,  color: '#20C997' },
        ].map((stat) => (
          <div key={stat.label} className="bento-card" style={{
            padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 14,
            flex: '1 1 120px',
          }}>
            <div style={{
              width: 10, height: 10, borderRadius: '50%',
              background: stat.color, boxShadow: `0 0 8px ${stat.color}`,
            }} />
            <div>
              <p style={{ fontSize: 22, fontWeight: 800, color: '#F0F0F5' }}>{stat.value}</p>
              <p style={{ fontSize: 11, color: '#6B6B80', marginTop: 1 }}>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Search + filters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Search */}
        <div style={{
          flex: '1 1 240px', display: 'flex', alignItems: 'center', gap: 10,
          background: '#111118', border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 12, padding: '0 14px', height: 42,
        }}>
          <Search size={15} color="#6B6B80" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            style={{
              flex: 1, background: 'none', border: 'none', outline: 'none',
              fontSize: 14, color: '#F0F0F5',
            }}
            aria-label="Search courses"
          />
        </div>

        {/* Filter pills */}
        <div style={{ display: 'flex', gap: 6 }}>
          <Filter size={14} color="#6B6B80" style={{ alignSelf: 'center', marginRight: 2 }} />
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '7px 14px', borderRadius: 99, fontSize: 12, fontWeight: 600,
                cursor: 'pointer', border: '1px solid',
                background: filter === f ? 'rgba(255,107,53,0.12)' : 'transparent',
                borderColor: filter === f ? 'rgba(255,107,53,0.4)' : 'rgba(255,255,255,0.08)',
                color: filter === f ? '#FF6B35' : '#6B6B80',
                transition: 'all 0.15s ease',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Course grid */}
      <AnimatePresence mode="popLayout">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ textAlign: 'center', padding: '60px 20px', color: '#6B6B80' }}
          >
            <BookOpen size={40} color="#3A3A4A" style={{ margin: '0 auto 12px' }} />
            <p style={{ fontSize: 15, fontWeight: 600 }}>No courses match your search</p>
            <p style={{ fontSize: 13, marginTop: 6 }}>Try a different search term or filter</p>
          </motion.div>
        ) : (
          <div className="courses-grid">
            {filtered.map((course, i) => (
              <CourseFullCard key={course.id} course={course} index={i} />
            ))}
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
