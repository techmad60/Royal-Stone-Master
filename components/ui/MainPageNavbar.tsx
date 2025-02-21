"use client";
import NavLink from "@/components/ui/MainPageNavLink";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BsFileBarGraphFill, BsPeopleFill } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { GoHomeFill } from "react-icons/go";
import { IoMdSettings } from "react-icons/io";
import { LiaTimesSolid } from "react-icons/lia";
import { RiMouseFill, RiStockLine } from "react-icons/ri";
import { TbPackages, TbTargetArrow } from "react-icons/tb";
import LogOut from "./LogOutModal";

interface MainPageNavbarProps {
  isNavOpen: boolean;
  toggleNav: () => void;
}

export default function MainPageNavbar({
  isNavOpen,
  toggleNav,
}: MainPageNavbarProps) {
  const pathname = usePathname();
  const [isLogOutModal, setIsLogOutModal] = useState(false);
  const isDisabled = pathname === "/auth/auth-dashboard";

  // Prevent scrolling when navbar is open
  useEffect(() => {
    if (isNavOpen && window.innerWidth < 1024) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [isNavOpen]);

  const handleLogOutModal = () => {
    setIsLogOutModal(true);
  };

  return (
    <>
      {/* Overlay for mobile menu */}
      {isNavOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-[60] lg:hidden"
          onClick={toggleNav}
        />
      )}

      {/* Fixed Sidebar Navbar */}
      <div
        className={`fixed top-0 left-0 min-h-screen w-3/4 lg:w-[230px] xl:w-[268px] bg-light-grey border-r border-slate-200 z-[60] transition-transform ${
          isNavOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <button className="absolute top-4 right-4 lg:hidden" onClick={toggleNav}>
          <LiaTimesSolid className="text-color-zero text-2xl" />
        </button>

        {/* Logo */}
        <Link href="/" className="flex border-b border-slate-200 pb-8 p-4 mt-10 lg:mt-2">
          <Image
            className="logo"
            src={"/images/logo.svg"}
            alt="Royal-Stone Logo"
            width={117.43}
            height={22}
          />
        </Link>

        {/* Navigation */}
        <nav className="mt-6 px-4 sm:px-12 lg:px-4">
          <ul className="flex flex-col space-y-6">
            <NavLink href="/main/dashboard" icon={<GoHomeFill />} label="Dashboard" disabled={isDisabled} />
            <NavLink href="/main/product" icon={<TbPackages />} label="Product" disabled={isDisabled} />
            <NavLink href="/main/investments" icon={<BsFileBarGraphFill />} label="Investments" disabled={isDisabled} />
            <NavLink href="/main/savings" icon={<TbTargetArrow />} label="Fixed Savings" disabled={isDisabled} />
            <NavLink href="/main/stocks" icon={<RiStockLine />} label="Stocks" disabled={isDisabled} />
            <NavLink href="/main/portfolio" icon={<RiMouseFill />} label="Portfolio" disabled={isDisabled} />
            <NavLink href="/main/referrals" icon={<BsPeopleFill />} label="Referrals" disabled={isDisabled} />
            <NavLink href="/main/settings" icon={<IoMdSettings />} label="Settings" />
          </ul>

          <hr className="my-6 border-gray-300" />

          {/* Logout Button */}
          <button
            className="flex items-center space-x-4 text-sm text-color-zero hover:text-red-500 duration-300 w-full"
            onClick={handleLogOutModal}
          >
            <FiLogOut />
            <span>Log Out</span>
          </button>
        </nav>
      </div>

      {/* Log Out Modal */}
      {isLogOutModal && <LogOut onClose={() => setIsLogOutModal(false)} />}
    </>
  );
}