//app/dashboard/layout.tsx
"use client";
import AuthHeader from "@/components/ui/AuthHeader";
import MainPageNavbar from "@/components/ui/MainPageNavbar";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen((prev) => !prev);
  return (
    <div className="flex flex-col bg-white">
      {/* Fixed Navbar */}
      <MainPageNavbar isNavOpen={isNavOpen} toggleNav={toggleNav} />
      {/* Main Content Area */}
      <div className="lg:ml-[260px] xl:ml-[300px] 2xlg:ml-[300px]">
        <AuthHeader title="Referrals" toggleNav={toggleNav} grid="" />
        <div className="mt-[9rem] px-4 sm:p-12 sm:mt-[5rem] lg:p-0 lg:mt-24">
          {children} {/* Ensure children are rendered here */}
        </div>
      </div>
    </div>
  );
}
