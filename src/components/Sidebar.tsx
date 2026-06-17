'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, BookOpen, TrendingUp,
  Calendar, Settings, ChevronLeft, ChevronRight, Zap,
} from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { id: 'courses',   label: 'Courses',   icon: BookOpen,         href: '/courses' },
  { id: 'progress',  label: 'Progress',  icon: TrendingUp,       href: '/progress' },
  { id: 'schedule',  label: 'Schedule',  icon: Calendar,         href: '/schedule' },
  { id: 'settings',  label: 'Settings',  icon: Settings,         href: '/settings' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && window.innerWidth <= 1024) {
        setCollapsed(true);
      } else if (window.innerWidth > 1024) {
        setCollapsed(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <motion.nav
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="sidebar-nav"
      style={{
        background: '#0B0B0F',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        flexDirection: 'column',
        height: '100vh',
        position: 'sticky',
        top: 0,
        flexShrink: 0,
        zIndex: 40,
        display: 'flex',
      }}
      aria-label="Main navigation"
    >
      {/* Header section (Logo + Collapse Button) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'space-between',
        padding: '24px 20px',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Zap size={18} color="#FF6B35" fill="#FF6B35" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -6 }}
                transition={{ duration: 0.12 }}
                style={{ fontSize: 18, fontWeight: 700, color: '#F0F0F5', whiteSpace: 'nowrap' }}
              >
                Spark
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            style={{
              background: 'none',
              border: 'none',
              color: '#4A4A60',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: 4,
            }}
            aria-label="Collapse sidebar"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          style={{
            background: 'none',
            border: 'none',
            color: '#4A4A60',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '8px 0',
            margin: '0 auto 12px',
          }}
          aria-label="Expand sidebar"
        >
          <ChevronRight size={16} />
        </button>
      )}

      {/* Nav Items */}
      <ul style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '0 12px', flex: 1, marginTop: 8 }} role="list">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <li key={item.id} style={{ listStyle: 'none' }}>
              <Link
                href={item.href}
                style={{
                  position: 'relative',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  gap: 12,
                  padding: '10px 12px',
                  borderRadius: 10,
                  textDecoration: 'none',
                  color: active ? '#FF6B35' : '#8A8A9F',
                  transition: 'color 0.15s ease',
                }}
                aria-current={active ? 'page' : undefined}
                title={collapsed ? item.label : undefined}
              >
                {active && (
                  <motion.div
                    layoutId="nav-highlight"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: 10,
                      background: 'rgba(255, 107, 53, 0.08)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon size={18} style={{ position: 'relative', zIndex: 1, flexShrink: 0 }} />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                      style={{ position: 'relative', zIndex: 1, fontSize: 13, fontWeight: 500, whiteSpace: 'nowrap' }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </li>
          );
        })}
      </ul>

      {/* User Footer */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'flex-start',
        gap: 12,
        padding: '16px',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        flexShrink: 0,
      }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: 8,
          background: '#FF6B35',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 12,
          fontWeight: 700,
          color: 'white',
          flexShrink: 0,
        }}>S</div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <p style={{ fontSize: 13, fontWeight: 600, color: '#F0F0F5' }}>Student</p>
              <p style={{ fontSize: 11, color: '#6B6B80', marginTop: 1 }}>Pro Plan</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
