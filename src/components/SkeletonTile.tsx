// ─── Individual Skeleton Tile ─────────────────────────────────────────────────
export default function SkeletonTile({
  className = '',
  style = {},
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`bento-card ${className}`}
      style={{ minHeight: 160, ...style }}
      aria-busy="true"
      aria-label="Loading..."
      role="status"
    >
      <div style={{ position: 'relative', zIndex: 10, padding: 20, display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>
        <div className="skeleton" style={{ width: 40, height: 40, borderRadius: 12 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
          <div className="skeleton" style={{ height: 12, width: '70%' }} />
          <div className="skeleton" style={{ height: 12, width: '45%' }} />
        </div>
        <div className="skeleton" style={{ height: 6, width: '100%', borderRadius: 99 }} />
      </div>
    </div>
  );
}

// ─── Hero Skeleton ────────────────────────────────────────────────────────────
export function SkeletonHero() {
  return (
    <div
      className="bento-card"
      style={{ gridColumn: 'span 3', minHeight: 200 }}
      aria-busy="true"
      role="status"
      aria-label="Loading..."
    >
      <div style={{ position: 'relative', zIndex: 10, padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
          <div className="skeleton" style={{ height: 12, width: 96 }} />
          <div className="skeleton" style={{ height: 36, width: 240 }} />
          <div className="skeleton" style={{ height: 36, width: 180 }} />
          <div className="skeleton" style={{ height: 12, width: 280, marginTop: 8 }} />
        </div>
        <div className="skeleton" style={{ width: 128, height: 128, borderRadius: '50%', flexShrink: 0 }} />
      </div>
    </div>
  );
}

// ─── Skeleton Course Cards — used as Suspense fallback ────────────────────────
export function SkeletonCourseCards() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 16,
      }}
    >
      {/* Hero row */}
      <SkeletonHero />
      <SkeletonTile style={{ gridColumn: 'span 1' }} />

      {/* Course cards */}
      {[...Array(4)].map((_, i) => (
        <SkeletonTile key={i} style={{ gridColumn: 'span 1' }} />
      ))}

      {/* Bottom row */}
      <SkeletonTile style={{ gridColumn: 'span 2', minHeight: 190 }} />
      <SkeletonTile style={{ gridColumn: 'span 2', minHeight: 190 }} />
    </div>
  );
}

// ─── Full page skeleton (loading.tsx) ─────────────────────────────────────────
export function SkeletonGrid() {
  return <SkeletonCourseCards />;
}
