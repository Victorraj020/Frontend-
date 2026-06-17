import { SkeletonGrid } from '@/components/SkeletonTile';

export default function Loading() {
  return (
    <div className="content-wrapper" aria-busy="true" aria-label="Loading page...">
      <div className="mb-6 hidden md:block">
        <div className="skeleton h-4 w-16 mb-2" />
        <div className="skeleton h-8 w-40" />
      </div>
      <SkeletonGrid />
    </div>
  );
}
