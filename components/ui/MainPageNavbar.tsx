"use client";
import NavLink from "@/components/ui/MainPageNavLink";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { BsFileBarGraphFill, BsPeopleFill } from "react-icons/bs";
import { FaClock } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { GoHomeFill } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";
import { LiaTimesSolid } from "react-icons/lia";
import { RiMouseFill, RiStockLine } from "react-icons/ri";
import { TbPackages, TbTargetArrow } from "react-icons/tb";



interface MainPageNavbarProps {
  isNavOpen: boolean;
  toggleNav: () => void;
}

export default function MainPageNavbar({
  isNavOpen,
  toggleNav,
}: MainPageNavbarProps) {
  const router = useRouter(); // Use Next.js router for navigation
  const pathname = usePathname();

  const isDisabled = pathname === "/auth/auth-dashboard";
  // Prevent scrolling when navbar is open
  useEffect(() => {
    if (isNavOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    // Cleanup function to remove class on unmount
    return () => document.body.classList.remove("overflow-hidden");
  }, [isNavOpen]);
 

  const handleLogout = () => {
    // Confirm logout with the user
    const isConfirmed = confirm("Are you sure you want to log out? 🤔");
    if (!isConfirmed) return;
  
    // Get the current userId and username
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");
    // const referral
  
    // Define KYC-related keys to preserve
    const kycKeys = [
      "isBankDetailsProvided",
      "ïsCryptoDetailsProvided",
      "isValidIdProvided",
      "isNextOfKinProvided",
      "isProfilePictureProvided",
    ];
  
    // Preserve the KYC statuses and username for the current user
    const preservedData: Record<string, string | null> = { userName };
    if (userId) {
      kycKeys.forEach((key) => {
        preservedData[key] = localStorage.getItem(`${key}-${userId}`);
      });
    }
  
    // Remove all keys from localStorage except the ones to preserve
    Object.keys(localStorage).forEach((key) => {
      if (
        key !== "userName" &&
        !kycKeys.some((kycKey) => key.startsWith(`${kycKey}-${userId}`))
      ) {
        localStorage.removeItem(key);
      }
    });
  
    // Restore the preserved data
    if (userId) {
      kycKeys.forEach((key) => {
        const statusValue = preservedData[key];
        if (statusValue !== null) {
          localStorage.setItem(`${key}-${userId}`, statusValue);
        }
        console.log(statusValue)
      });
     
    }
    if (userName) {
      localStorage.setItem("userName", userName);
    }
  
    // Redirect to login page
    try {
      router.push("/auth/login");
    } catch (error) {
      console.error("Failed to redirect to login page:", error);
      alert("An error occurred during logout. Please try again.");
    }
  };
  

  return (
    <>
      {isNavOpen && (
        <div
          className="fixed top-0 right-0 w-[25vw] min-h-screen bg-black opacity-50 z-50 lg:hidden"
          onClick={toggleNav}
        />
      )}
      <div
        className={`flex z-50 flex-col bg-light-grey absolute min-h-screen top-0 left-0 p-4 space-y-8 w-3/4 lg:w-[230px] lg:static lg:px-8 border-r border-slate-200 xl:w-[268px] ${
          isNavOpen ? "fixed" : "hidden lg:flex"
        }`}
      >
        <button className="flex justify-center lg:hidden" onClick={toggleNav}>
          <LiaTimesSolid className="text-color-zero" />
        </button>
        {/* Logo Img */}
        <Link href="/" className="flex border-b border-slate-200 pb-3">
          <Image
            className="logo"
            src={"/images/logo.svg"}
            alt="Royal-Stone Logo"
            width={117.43}
            height={22}
          />
        </Link>
        <nav>
          <ul>
            <li className="flex flex-col gap-6">
              <NavLink
                href="/main/dashboard"
                icon={<GoHomeFill />}
                label="Dashboard"
                disabled={isDisabled} // Pass status to wrapper
              />
              <NavLink
                href="/main/product"
                icon={<TbPackages />}
                label="Product"
                disabled={isDisabled}
              />
              <NavLink
                href="/main/portfolio"
                icon={<RiMouseFill />}
                label="Portfolio"
                disabled={isDisabled}
              />
              <NavLink
                href="/main/stocks"
                icon={<RiStockLine />}
                label="Stocks"
                disabled={isDisabled}
              />
              <NavLink
                href="/main/savings"
                icon={<TbTargetArrow />}
                label="Fixed Savings"
                disabled={isDisabled}
              />
              <NavLink
                href="/main/investments"
                icon={<BsFileBarGraphFill />}
                label="Investments"
                disabled={isDisabled}
              />
              <NavLink
                href="/main/referrals"
                icon={<BsPeopleFill />}
                label="Referrals"
                disabled={isDisabled}
              />
              <NavLink
                href="/main/transaction-history"
                icon={<FaClock />}
                label="Transaction History"
                disabled={isDisabled}
              />
              <NavLink
                href="/main/settings"
                icon={<IoMdSettings />}
                label="Settings"
                // disabled={isDisabled}
              />
            </li>
            <hr className="my-6" />
            <li className="">
              <button
                className="flex items-center text-sm space-x-4 text-slate-400 hover:text-red-500 duration-300"
                onClick={handleLogout} // Add the logout handler
              >
                <FiLogOut />
                <span>Log Out</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
