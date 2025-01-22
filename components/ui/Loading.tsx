// components/ui/Spinner.tsx
import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-[#D9D9D9A6] flex items-center justify-center z-50">
      <div className="flex items-center justify-center h-full">
        <div className="w-10 h-10 border-4 border-color-one border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
}
