'use client';

import { motion } from 'framer-motion';
import type { Course } from '@/lib/supabase';
import HeroTile from './HeroTile';
import StatsTile from './StatsTile';
import CourseCard from './CourseCard';
import ActivityTile from './ActivityTile';
import UpcomingTile from './UpcomingTile';

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

const tileVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 260, damping: 22 },
  },
};

interface BentoGridProps {
  courses: Course[];
  isLive?: boolean;
}

export default function BentoGrid({ courses, isLive = false }: BentoGridProps) {
  return (
    <div>
      {/* Demo mode banner */}
      {!isLive && (
        <div style={{
          marginBottom: 14, padding: '10px 16px', borderRadius: 12,
          background: 'rgba(255,107,53,0.08)',
          border: '1px solid rgba(255,107,53,0.2)',
          fontSize: 12, fontWeight: 600, color: '#FF6B35',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <span>⚡</span>
          <span>Demo mode — connect your Supabase to load live course data</span>
        </div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
        aria-label="Dashboard bento grid"
      >
        {/* ROW 1: Hero (3 cols) + Stats (1 col) */}
        <motion.div
          variants={tileVariants}
          whileHover={{ scale: 1.012, y: -2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="col-span-1 md:col-span-3"
        >
          <HeroTile streakDays={14} />
        </motion.div>

        <motion.div
          variants={tileVariants}
          whileHover={{ scale: 1.015, y: -2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="col-span-1 md:col-span-1"
        >
          <StatsTile />
        </motion.div>

        {/* ROW 2: Course cards — each 1 col */}
        {courses.map((course) => (
          <motion.div
            key={course.id}
            variants={tileVariants}
            whileHover={{ scale: 1.02, y: -3 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="col-span-1"
          >
            <CourseCard course={course} />
          </motion.div>
        ))}

        {/* ROW 3: Activity (2 cols) + Upcoming (2 cols) */}
        <motion.div
          variants={tileVariants}
          whileHover={{ scale: 1.015, y: -2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="col-span-1 md:col-span-2"
        >
          <ActivityTile />
        </motion.div>

        <motion.div
          variants={tileVariants}
          whileHover={{ scale: 1.015, y: -2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="col-span-1 md:col-span-2"
        >
          <UpcomingTile />
        </motion.div>
      </motion.div>
    </div>
  );
}
