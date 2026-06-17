import type { Metadata } from 'next';
import ScheduleClient from '@/components/ScheduleClient';

export const metadata: Metadata = { title: 'Schedule' };

export default function SchedulePage() {
  return (
    <div className="content-wrapper">
      <header className="desktop-page-header">
        <p className="page-eyebrow">Planner</p>
        <h1 className="page-title">My Schedule</h1>
      </header>
      <ScheduleClient />
    </div>
  );
}
