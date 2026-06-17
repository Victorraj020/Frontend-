'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Calendar, Clock, Video, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const lessons = [
  { id: 1, day: 2, title: 'React Server Components Deep Dive', course: 'Advanced React', time: '10:00 AM - 11:30 AM', type: 'Live Class', instructor: 'Dan Abramov', color: '#FF6B35', bg: 'rgba(255,107,53,0.12)' },
  { id: 2, day: 2, title: 'CAP Theorem & Distributed Systems', course: 'System Design', time: '02:00 PM - 03:00 PM', type: 'Q&A Session', instructor: 'Alex Xu', color: '#FF3CAC', bg: 'rgba(255,60,172,0.12)' },
  { id: 3, day: 4, title: 'Advanced TypeScript Generics', course: 'TypeScript Mastery', time: '11:00 AM - 12:30 PM', type: 'Live Class', instructor: 'Josh Goldberg', color: '#9B7FE8', bg: 'rgba(155,127,232,0.12)' },
  { id: 4, day: 5, title: 'Tailwind CSS v4 & PostCSS Configurations', course: 'UI/UX Engineering', time: '04:00 PM - 05:00 PM', type: 'Workshop', instructor: 'Adam Wathan', color: '#20C997', bg: 'rgba(32,201,151,0.12)' },
];

export default function ScheduleClient() {
  const [selectedDay, setSelectedDay] = useState(2); // Wednesday (0-indexed Mon=0)

  const activeLessons = lessons.filter(l => l.day === selectedDay);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Calendar Strip */}
      <div className="bento-card" style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F0F0F5' }}>June 2026</h2>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{ background: 'none', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: 6, cursor: 'pointer', color: '#6B6B80' }} aria-label="Previous week">
              <ChevronLeft size={16} />
            </button>
            <button style={{ background: 'none', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: 6, cursor: 'pointer', color: '#6B6B80' }} aria-label="Next week">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          {WEEKDAYS.map((day, idx) => {
            const dayNum = 15 + idx; // Just arbitrary week dates
            const isSelected = selectedDay === idx;
            const hasLesson = lessons.some(l => l.day === idx);

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(idx)}
                style={{
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  padding: '12px 6px', borderRadius: 12, border: '1px solid',
                  background: isSelected ? 'rgba(255, 107, 53, 0.12)' : 'transparent',
                  borderColor: isSelected ? '#FF6B35' : 'rgba(255,255,255,0.06)',
                  cursor: 'pointer', transition: 'all 0.15s ease',
                }}
                aria-label={`${day} June ${dayNum}`}
              >
                <span style={{ fontSize: 11, color: isSelected ? '#FF6B35' : '#6B6B80', fontWeight: 600 }}>{day}</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: isSelected ? '#FF6B35' : '#F0F0F5' }}>{dayNum}</span>
                {hasLesson && !isSelected && (
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#FF6B35' }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Lesson List */}
      <div>
        <h2 style={{ fontSize: 15, fontWeight: 700, color: '#F0F0F5', marginBottom: 12 }}>Lessons for Today</h2>

        {activeLessons.length === 0 ? (
          <div className="bento-card" style={{ padding: 40, textAlign: 'center', color: '#6B6B80' }}>
            <Calendar size={36} color="#3A3A4A" style={{ margin: '0 auto 12px' }} />
            <p style={{ fontSize: 14, fontWeight: 600 }}>No lessons scheduled for this day</p>
            <p style={{ fontSize: 12, marginTop: 4 }}>Enjoy your study break!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {activeLessons.map((lesson, idx) => (
              <motion.div
                key={lesson.id}
                className="bento-card"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.35 }}
                style={{ padding: 20 }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
                  {/* Left accent */}
                  <div style={{
                    width: 4, height: 48, borderRadius: 99, flexShrink: 0,
                    background: lesson.color, boxShadow: `0 0 10px ${lesson.color}`,
                  }} />

                  {/* Body */}
                  <div style={{ flex: 1, minWidth: 200 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 6,
                        background: lesson.bg, color: lesson.color, border: `1px solid ${lesson.color}20`
                      }}>
                        {lesson.course}
                      </span>
                      <span style={{ fontSize: 11, color: '#6B6B80' }}>• {lesson.type}</span>
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: '#F0F0F5', lineHeight: 1.4 }}>
                      {lesson.title}
                    </h3>
                    <p style={{ fontSize: 12, color: '#6B6B80', marginTop: 4 }}>
                      Instructor: <span style={{ color: '#A0A0B0', fontWeight: 600 }}>{lesson.instructor}</span>
                    </p>
                  </div>

                  {/* Details column */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0, alignItems: 'flex-end', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#F0F0F5', fontWeight: 600 }}>
                      <Clock size={13} color={lesson.color} />
                      <span>{lesson.time}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#6B6B80' }}>
                      <Video size={12} />
                      <span>Virtual Room 4B</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
