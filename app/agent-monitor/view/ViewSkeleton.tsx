import React from "react";

const ViewSkeleton = () => {
  return (
    <div className="divide-y divide-gray-100">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 px-6 py-4"
        >
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gray-100 animate-pulse" />
            <div>
              <div className="h-3 w-40 bg-gray-100 rounded animate-pulse" />
              <div className="mt-2 h-2 w-24 bg-gray-100 rounded animate-pulse" />
            </div>
          </div>
          <div className="hidden md:block h-3 w-32 bg-gray-100 rounded animate-pulse" />
          <div className="hidden md:block h-3 w-28 bg-gray-100 rounded animate-pulse" />
          <div className="hidden md:flex justify-end">
            <div className="h-8 w-28 bg-gray-100 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewSkeleton;
