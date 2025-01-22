"use client";
import { useEffect, useState } from "react";
interface TextToggleProps {
  description?: string; // Make description optional
}

export default function TextToggle({ description = "" }: TextToggleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // Adjust based on `lg` breakpoint
    };

    // Set initial screen size and add resize listener
    handleResize();
    window.addEventListener("resize", handleResize);

    // Clean up the event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleToggle = () => setIsExpanded((prev) => !prev);

  return (
    <div className="py-4">
      <p className="text-color-form text-sm leading-[25px] lg:leading-[29px]">
        {isExpanded || isLargeScreen
          ? description // Show full description
          : `${description.slice(0, 100)}...`} {/* Show truncated description */}
        
        {/* Toggle option for small screens only */}
        {!isLargeScreen && description.length > 100 && (
          <span
            className="text-color-one border- border-color-one cursor-pointer"
            onClick={handleToggle}
          >
            {isExpanded ? "Show Less" : "Show More"}
          </span>
        )}
      </p>
    </div>
  );
}
