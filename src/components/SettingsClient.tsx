'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { User, Bell, Shield, Palette, Database, Check } from 'lucide-react';

export default function SettingsClient() {
  const [profile, setProfile] = useState({
    name: 'Student Name',
    email: 'student@spark.edu',
    theme: 'Dark (Ember & Ink)',
  });
  
  const [notifications, setNotifications] = useState({
    dailyStreak: true,
    classReminders: true,
    weeklyDigest: false,
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 640 }}>
      {/* Form Card */}
      <form onSubmit={handleSave} className="bento-card" style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#F0F0F5', display: 'flex', alignItems: 'center', gap: 8 }}>
          <User size={18} color="#FF6B35" /> Personal Profile
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label htmlFor="name-input" style={{ fontSize: 12, fontWeight: 600, color: '#6B6B80' }}>Display Name</label>
          <input
            id="name-input"
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            style={{
              background: '#14141d', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 10, padding: '10px 14px', fontSize: 14, color: '#F0F0F5',
              outline: 'none', transition: 'border-color 0.15s ease',
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label htmlFor="email-input" style={{ fontSize: 12, fontWeight: 600, color: '#6B6B80' }}>Email Address</label>
          <input
            id="email-input"
            type="email"
            value={profile.email}
            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            style={{
              background: '#14141d', border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: 10, padding: '10px 14px', fontSize: 14, color: '#F0F0F5',
              outline: 'none', transition: 'border-color 0.15s ease',
            }}
          />
        </div>

        {/* Notifications toggle */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#F0F0F5', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <Bell size={18} color="#FF3CAC" /> Notification Settings
          </h2>

          {[
            { key: 'dailyStreak', label: 'Daily streak reminders', desc: 'Alert me to complete today\'s lesson before streak reset.' },
            { key: 'classReminders', label: 'Upcoming class alerts', desc: 'Notify me 15 minutes before live classes start.' },
            { key: 'weeklyDigest', label: 'Weekly digest', desc: 'Receive a summary of completed courses and stats.' },
          ].map((item) => (
            <div key={item.key} style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
              <div>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#F0F0F5' }}>{item.label}</span>
                <p style={{ fontSize: 12, color: '#6B6B80', marginTop: 2 }}>{item.desc}</p>
              </div>
              <button
                type="button"
                id={`toggle-${item.key}`}
                onClick={() => setNotifications({
                  ...notifications,
                  [item.key]: !notifications[item.key as keyof typeof notifications]
                })}
                style={{
                  width: 38, height: 20, borderRadius: 99,
                  background: notifications[item.key as keyof typeof notifications] ? '#FF6B35' : 'rgba(255,255,255,0.08)',
                  position: 'relative', border: 'none', cursor: 'pointer',
                  transition: 'background-color 0.2s ease', flexShrink: 0,
                }}
                aria-label={`Toggle ${item.label}`}
              >
                <div style={{
                  width: 14, height: 14, borderRadius: '50%', background: '#white',
                  position: 'absolute', top: 3,
                  left: notifications[item.key as keyof typeof notifications] ? 21 : 3,
                  transition: 'left 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  backgroundColor: '#FFFFFF'
                }} />
              </button>
            </div>
          ))}
        </div>

        {/* Database Status Info */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20,
          display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: '#6B6B80'
        }}>
          <Database size={14} color="#6B6B80" />
          <span>Supabase live sync: enabled</span>
        </div>

        {/* Save Button */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
          <button
            type="submit"
            style={{
              padding: '10px 24px', borderRadius: 10, border: 'none',
              background: 'linear-gradient(135deg, #FF6B35, #FF3CAC)',
              color: 'white', fontWeight: 700, fontSize: 14,
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
              boxShadow: '0 4px 15px rgba(255,107,53,0.3)',
            }}
          >
            {saved ? (
              <>
                <Check size={16} /> Saved!
              </>
            ) : 'Save Preferences'}
          </button>
        </div>
      </form>
    </div>
  );
}
