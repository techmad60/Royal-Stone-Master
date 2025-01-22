"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  disabled?: boolean; // Added disabled prop
}

export default function NavLink({
  href,
  icon,
  label,
  disabled = false,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);
  const isOnAuthDashboard = pathname === "/auth/auth-dashboard"; // Check if on auth-dashboard

  return (
    <Link
      href={ href}
      className={`flex items-center gap-2 ${
        isOnAuthDashboard || disabled
          ? "text-slate-300" // Inactive style for auth-dashboard
          : isActive
          ? "text-color-one"
          : "text-slate-400 hover:text-green-400"
      } duration-150`}
      
    >
      <div
        className={`w-7 h-7 shadow-sm flex items-center justify-center transform rotate-45 rounded-[9px]`}
      >
        <span className="transform -rotate-45">{icon}</span>
      </div>
      <p className="text-sm">{label}</p>
    </Link>
  );
}
