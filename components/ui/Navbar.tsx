// Navbar Component
"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HiBars3 } from "react-icons/hi2";
import { LiaTimesSolid } from "react-icons/lia";

export default function Navbar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  //Toggle Nav
  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  //Check if Link is Active
  const pathname = usePathname();
  const isActiveLink = (href: string) => pathname === href;

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

  return (
    <nav className={`lg:flex justify-between lg:self-center items-center z-40`}>
      <div className="flex justify-between items-center">
        <Link href="/" className="flex">
          <Image
            className="logo lg:w-[120px]"
            src={"/images/logo.svg"}
            alt="Royal-Stone Logo"
            width={129}
            height={24.17}
          />
        </Link>
        <div className="cursor-pointer lg:hidden" onClick={handleToggleNav}>
          <HiBars3 className="text-[#3A495B] text-2xl" />
        </div>
      </div>

      <div
        className={`bg-color-two absolute inset-0 w-full h-screen flex flex-col items-center px-4 z-40 lg:w-auto lg:flex-row lg:static lg:h-auto lg:bg-transparent lg:p-0 ${
          isNavOpen ? "fixed" : "hidden lg:flex"
        }`}
      >
        <div className="flex w-full justify-between border-b border-[#D6EFD4] py-6 lg:hidden">
          <Image
            className="logo lg:hidden"
            src={"/images/logo.svg"}
            alt="Royal-Stone Logo"
            width={129}
            height={24.17}
          />
          <button onClick={handleToggleNav} className="">
            <LiaTimesSolid className="w-5 h-5 text-black" />
          </button>
        </div>

        <div className="flex flex-col w-full text-color-zero my-2 text-center text-sm leading-[3.75rem] lg:flex-row lg:border-0 lg:text-sm lg:my-4 lg:gap-12 xl:gap-28 z-50">
          <div className="flex flex-col lg:flex-row items-center lg:space-x-5 lg:text-sm xl:space-x-12">
            <Link
              href="/"
              className={`${
                isActiveLink("/")
                  ? "border-b border-blue-800 text-blue-800 font-bold"
                  : ""
              } hover:text-blue-800 hover:border-blue-800 transition duration-150 hover:ease-in`}
            >
              Home
            </Link>
            <Link
              href="/landing-page/about-us"
              className={`${
                isActiveLink("/landing-page/about-us")
                  ? "border-b border-blue-800 text-blue-800 font-bold"
                  : ""
              } hover:text-blue-800 hover:border-blue-800 transition duration-150 hover:ease-in`}
            >
              About Us
            </Link>
            <Link
              href="/landing-page/contact-us"
              className={`${
                isActiveLink("/landing-page/contact-us")
                  ? "border-b border-blue-800 text-blue-800 font-bold"
                  : ""
              } hover:text-blue-800 hover:border-blue-800 duration-150 hover:ease-in`}
            >
              Contact Us
            </Link>
            <Link
              href="/landing-page/privacy-policy"
              className={`${
                isActiveLink("/landing-page/privacy-policy")
                  ? "border-b border-blue-800 text-blue-800 font-bold"
                  : ""
              } hover:text-blue-800 hover:border-blue-800 duration-150 hover:ease-in`}
            >
              Privacy Policy
            </Link>
            <Link
              href="/landing-page/terms-of-service"
              className={`${
                isActiveLink("/landing-page/terms-of-service")
                  ? "border-b border-blue-800 text-blue-800 font-bold"
                  : ""
              } hover:text-blue-800 hover:border-blue-800 duration-150 hover:ease-in`}
            >
              Terms Of Service
            </Link>
          </div>

          <div className="flex flex-col space-y-6 mt-4 w-full justify-center items-center lg:flex lg:flex-row lg:space-x-4 lg:space-y-0 lg:mt-0 rounded-md text-center lg:w-auto">
            {/* <Link
              href="/auth/login"
              className="text-color-one w-[295px] h-[45px] p-[10px] flex justify-center items-center bg-white rounded-[10px] border border-slate-200 transition duration-150 hover:text-green-700 hover:border-green-700 hover:ease-in font-semibold lg:w-[80px] lg:h-[37px] lg:px-4 lg:py-2 lg:text-sm "
            >
              Login
            </Link> */}
            <button
              onClick={() =>
                alert("The app isn't ready yet! But Chill, we're cooking!")
              }
              className="text-color-one w-[295px] h-[45px] p-[10px] flex justify-center items-center bg-white rounded-[10px] border border-slate-200 transition duration-150 hover:text-green-700 hover:border-green-700 hover:ease-in font-semibold lg:w-[80px] lg:h-[37px] lg:px-4 lg:py-2 lg:text-sm "
            >
              Login
            </button>

            <button
              onClick={() =>
                alert("The app isn't ready yet! But Chill, we're cooking!")
              }
              className="text-color-three w-[295px] h-[45px] p-[10px] flex justify-center items-center bg-color-one hover:bg-green-700 transition duration-150 hover:ease-in font-semibold rounded-[10px] lg:w-[127px] lg:h-[37px] lg:text-sm"
            >
              Get Started
            </button>
            {/* <Link
              href="/auth/signup"
              className="text-color-three w-[295px] h-[45px] p-[10px] flex justify-center items-center bg-color-one hover:bg-green-700 transition duration-150 hover:ease-in font-semibold rounded-[10px] lg:w-[127px] lg:h-[37px] lg:text-sm"
            >
              Get Started
            </Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
