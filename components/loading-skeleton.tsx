'use client';

export default function LoadingSkeleton() {
  return (
    <div className="wiki-container animate-pulse">
      {/* Infobox skeleton */}
      <div className="wiki-infobox">
        <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>

      {/* Title skeleton */}
      <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4" />
      
      {/* Summary skeleton */}
      <div className="space-y-2 mb-6">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
      </div>

      {/* Sections skeleton */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="mb-8">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
