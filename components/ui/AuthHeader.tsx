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

export default function AuthHeader({
  title,
  toggleNav,
  grid,
}: AuthHeaderProps) {
  const [profilePicture, setProfilePicture] = useState<string>(
    "/images/profile-empty.png"
  );
  const pathname = usePathname();
  const showMenu =
    pathname.includes("/auth/auth-dashboard") || pathname.includes("/main/");

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.warn("No access token found");
        return;
      }

      try {
        // Fetch user's profile data
        const response = await fetch(
          "https://api-royal-stone.softwebdigital.com/api/account/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          console.log("Response data:", responseData); // Debug log
          const imageUrl = responseData.data?.avatar;
          console.log("Avatar URL:", imageUrl); // Debug log
          setProfilePicture(imageUrl || "/images/profile-empty.png");
        } else {
          console.error("Failed to fetch profile picture");
        }
      } catch (error) {
        console.error("Error fetching profile picture:", error);
      }
    };

    fetchProfilePicture();
  }, []);

  return (
    <div className={`flex flex-col space-y-4 lg:pr-8 ${grid}`}>
      {/* Logo Img */}
      <Link href="/" className="flex">
        <Image
          className="logo lg:hidden"
          src={"/images/logo.svg"}
          alt="Royal-Stone Logo"
          width={106.75}
          height={20}
        />
      </Link>
      <div className="flex justify-between items-center border-y py-4 lg:border-y-0 lg:border-b">
        <div className="flex gap-4 items-center">
          {showMenu && <FaBars className="lg:hidden" onClick={toggleNav} />}
          <h1 className="font-semibold text-base text-color-zero lg:text-[22px]">
            {title}
          </h1>
        </div>
        {/* User and Notification Img */}
        {showMenu && (
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 rounded-full overflow-hidden">
              {/* Profile Picture */}
              <Image
                src={profilePicture}
                alt="User Image"
                width={20}
                height={20}
                className="w-full h-full object-cover"
              />
            </div>
            <Link href="/main/portfolio/notifications">
              <Image
                src={"/images/notification.svg"}
                alt="Notification Image"
                width={25.41}
                height={25.41}
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
