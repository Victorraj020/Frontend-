import { Suspense } from 'react';
import { getCourses, type Course } from '@/lib/supabase';
import BentoGrid from '@/components/BentoGrid';
import { SkeletonCourseCards } from '@/components/SkeletonTile';

export const metadata = { title: 'Dashboard' };
export const dynamic = 'force-dynamic';

const FALLBACK_COURSES: Course[] = [
  { id: '1', title: 'Advanced React Patterns',    progress: 75, icon_name: 'Code2',    created_at: '' },
  { id: '2', title: 'System Design Fundamentals', progress: 45, icon_name: 'Server',   created_at: '' },
  { id: '3', title: 'TypeScript Mastery',          progress: 90, icon_name: 'FileCode', created_at: '' },
  { id: '4', title: 'UI/UX Engineering',           progress: 30, icon_name: 'Palette',  created_at: '' },
];

async function CourseSection() {
  let courses: Course[] = FALLBACK_COURSES;
  let isLive = false;
  try {
    const data = await getCourses();
    if (data.length > 0) { courses = data; isLive = true; }
  } catch { /* use fallback */ }
  return <BentoGrid courses={courses} isLive={isLive} />;
}

export default function DashboardPage() {
  return (
    <div className="content-wrapper">
      <header className="desktop-page-header">
        <p className="page-eyebrow">Overview</p>
        <h1 className="page-title">Dashboard</h1>
      </header>
      <Suspense fallback={<SkeletonCourseCards />}>
        <CourseSection />
      </Suspense>
    </div>
  );
}
