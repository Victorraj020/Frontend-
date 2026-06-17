import { getCourses, type Course } from '@/lib/supabase';
import CoursesClient from '@/components/CoursesClient';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Courses' };
export const dynamic = 'force-dynamic';

const FALLBACK_COURSES: Course[] = [
  { id: '1', title: 'Advanced React Patterns',       progress: 75, icon_name: 'Code2',    created_at: '' },
  { id: '2', title: 'System Design Fundamentals',    progress: 45, icon_name: 'Server',   created_at: '' },
  { id: '3', title: 'TypeScript Mastery',             progress: 90, icon_name: 'FileCode', created_at: '' },
  { id: '4', title: 'UI/UX Engineering',              progress: 30, icon_name: 'Palette',  created_at: '' },
  { id: '5', title: 'Node.js & APIs',                 progress: 60, icon_name: 'Cpu',      created_at: '' },
  { id: '6', title: 'Database Architecture',          progress: 20, icon_name: 'Database', created_at: '' },
  { id: '7', title: 'Web Performance',                progress: 100, icon_name: 'Globe',   created_at: '' },
  { id: '8', title: 'Frontend Testing',               progress: 10, icon_name: 'BookOpen', created_at: '' },
];

export default async function CoursesPage() {
  let courses: Course[] = FALLBACK_COURSES;
  let isLive = false;
  try {
    const data = await getCourses();
    if (data.length > 0) { courses = data; isLive = true; }
  } catch { /* use fallback */ }

  return (
    <div className="content-wrapper">
      <header className="desktop-page-header">
        <p className="page-eyebrow">Learning Library</p>
        <h1 className="page-title">My Courses</h1>
      </header>
      <CoursesClient courses={courses} isLive={isLive} />
    </div>
  );
}
