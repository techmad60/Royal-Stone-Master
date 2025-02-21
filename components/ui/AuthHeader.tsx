"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";


interface AuthHeaderProps {
  title?: string;
  toggleNav?: () => void;
  grid?: string;
}

interface Notification {
  id: string;
  status: string;
  message: string;
}


export default function AuthHeader({ title, toggleNav, grid }: AuthHeaderProps) {
  const [profilePicture, setProfilePicture] = useState<string>("/images/profile-empty.png");
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const pathname = usePathname();
  const showMenu = pathname.includes("/auth/auth-dashboard") || pathname.includes("/main/");
  const isAuthDashboard = pathname === "/auth/auth-dashboard";

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const response = await fetch("https://api-royal-stone.softwebdigital.com/api/account/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          setProfilePicture(responseData.data?.avatar || "/images/profile-empty.png");
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    const fetchUnreadNotifications = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const response = await fetch("https://api-royal-stone.softwebdigital.com/api/notification", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          const unread = responseData.data?.data.filter((notif: Notification) => notif.status !== "read").length || 0;

          setUnreadCount(unread);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchProfilePicture();
    fetchUnreadNotifications();
  }, []);

  return (
    <div className={`flex flex-col space-y-4 fixed z-50 w-full bg-white px-4 py-4 sm:px-12 lg:p-0 lg:pr-[270px] xl:pr-[320px] ${grid}`}>
      {/* Logo Img */}
      <Link href="/" className="flex">
        <Image className="logo lg:hidden" src={"/images/logo.svg"} alt="Royal-Stone Logo" width={106.75} height={20} />
      </Link>

      <div className="flex items-center border-y py-4 justify-between lg:border-y-0 lg:border-b">
        {/* Header and Nav */}
        <div className="flex gap-4 items-center">
          {showMenu && <FaBars className="lg:hidden" onClick={toggleNav} />}
          <h1 className="font-semibold text-base text-color-zero lg:text-[22px]">{title}</h1>
        </div>

        {/* User and Notification Icons */}
        {showMenu && (
          <div className="flex items-center gap-3 relative">
            {!isAuthDashboard && (
              <Link href="/main/settings" className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                <Image src={profilePicture} alt="User Image" width={24} height={24} className="w-full h-full object-cover" />
              </Link>
            )}

            {!isAuthDashboard && (
              <Link href="/main/notifications" className="relative flex-shrink-0">
                <Image src={"/images/notification.svg"} alt="Notification Icon" width={30} height={30} />
                
                {/* Red Badge for Unread Notifications */}
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs  w-5 h-5 flex items-center justify-center rounded-full">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
