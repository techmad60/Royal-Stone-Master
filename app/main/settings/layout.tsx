//app/product/layout.tsx
"use client"
import { useState } from "react";
import AuthHeader from "@/components/ui/AuthHeader";
import MainPageNavbar from "@/components/ui/MainPageNavbar";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen((prev) => !prev);
  return (
    <div className="flex flex-col bg-white">
     
     <div className={`p-4 sm:p-8 lg:grid lg:p-0 lg:grid-cols-4 xl:grid-cols-5 xl:gap-44 2xlg:gap-0`}>
        <MainPageNavbar isNavOpen={isNavOpen} toggleNav={toggleNav} />
        {/* Item 2 */}
        <div className="flex flex-col lg:col-span-3 xl:col-span-4">
          <AuthHeader title="Settings" toggleNav={toggleNav} grid=""/>
          {children} {/* Ensure children are rendered here */}
        </div>
      </div>
    </div>
  );
}

