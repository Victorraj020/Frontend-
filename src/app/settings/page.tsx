import type { Metadata } from 'next';
import SettingsClient from '@/components/SettingsClient';

export const metadata: Metadata = { title: 'Settings' };

export default function SettingsPage() {
  return (
    <div className="content-wrapper">
      <header className="desktop-page-header">
        <p className="page-eyebrow">Account</p>
        <h1 className="page-title">Settings</h1>
      </header>
      <SettingsClient />
    </div>
  );
}
