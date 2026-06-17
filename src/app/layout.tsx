import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Sidebar from '@/components/Sidebar';
import MobileHeader from '@/components/MobileHeader';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'Spark — Student Dashboard', template: '%s | Spark' },
  description: 'Your futuristic learning command center. Track courses, progress, and streaks.',
};

export const viewport: Viewport = {
  themeColor: '#0A0A0F',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body>
        <div className="app-shell">
          {/* Mobile top bar — visible only on mobile */}
          <MobileHeader />

          <div className="app-body">
            {/* Desktop sidebar */}
            <Sidebar />

            {/* All page content */}
            <main className="main-scroll" id="main-content">
              {children}
            </main>
          </div>

          {/* Mobile bottom nav */}
          <MobileHeader bottomOnly />
        </div>
      </body>
    </html>
  );
}
