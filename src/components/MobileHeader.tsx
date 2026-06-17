'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, BookOpen, TrendingUp, Settings, Zap } from 'lucide-react';

const mobileNavItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { id: 'courses',   label: 'Courses',   icon: BookOpen,         href: '/courses' },
  { id: 'progress',  label: 'Progress',  icon: TrendingUp,       href: '/progress' },
  { id: 'settings',  label: 'Settings',  icon: Settings,         href: '/settings' },
];

export default function MobileHeader({ bottomOnly = false }: { bottomOnly?: boolean }) {
  const pathname = usePathname();
  const isActive = (href: string) => href === '/' ? pathname === '/' : pathname.startsWith(href);

  if (bottomOnly) {
    return (
      <nav
        className="mobile-bottom-nav"
        aria-label="Mobile navigation"
        style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
          display: 'none',
          alignItems: 'center', justifyContent: 'space-around',
          padding: '8px 4px 14px',
          background: '#0B0B0F',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        {mobileNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.id}
              href={item.href}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                gap: 4, padding: '4px 12px', position: 'relative',
                textDecoration: 'none', minWidth: 60,
              }}
              aria-current={active ? 'page' : undefined}
            >
              {active && (
                <motion.div
                  layoutId="mobile-nav-dot"
                  style={{
                    position: 'absolute', top: -8, left: '50%', transform: 'translateX(-50%)',
                    width: 16, height: 2, borderRadius: 99,
                    background: '#FF6B35',
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon size={20} color={active ? '#FF6B35' : '#5A5A70'} />
              <span style={{ fontSize: 9, fontWeight: 600, color: active ? '#FF6B35' : '#5A5A70' }}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <header
      className="mobile-top-bar"
      style={{
        display: 'none', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 18px', position: 'sticky', top: 0, zIndex: 50,
        background: '#0B0B0F',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)', flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Zap size={16} color="#FF6B35" fill="#FF6B35" />
        <span style={{ fontSize: 18, fontWeight: 700, color: '#F0F0F5' }}>Spark</span>
      </div>
      <div style={{
        width: 30, height: 30, borderRadius: 6,
        background: '#FF6B35',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, fontWeight: 700, color: 'white',
      }}>S</div>
    </header>
  );
}
