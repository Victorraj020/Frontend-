import { getCourses, type Course } from '@/lib/supabase';
import ProgressClient from '@/components/ProgressClient';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Progress' };

const FALLBACK_COURSES: Course[] = [
  { id: '1', title: 'Advanced React Patterns',    progress: 75, icon_name: 'Code2',    created_at: '' },
  { id: '2', title: 'System Design Fundamentals', progress: 45, icon_name: 'Server',   created_at: '' },
  { id: '3', title: 'TypeScript Mastery',          progress: 90, icon_name: 'FileCode', created_at: '' },
  { id: '4', title: 'UI/UX Engineering',           progress: 30, icon_name: 'Palette',  created_at: '' },
];

export default async function ProgressPage() {
  let courses: Course[] = FALLBACK_COURSES;
  try {
    const data = await getCourses();
    if (data.length > 0) courses = data;
  } catch { /* use fallback */ }

  return (
    <div className="content-wrapper">
      <header className="desktop-page-header">
        <p className="page-eyebrow">Analytics</p>
        <h1 className="page-title">My Progress</h1>
      </header>
      <ProgressClient courses={courses} />
    </div>
  );
}
