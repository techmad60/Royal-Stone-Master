"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import Loading from "../ui/Loading";

interface AuthWrapperProps {
  children: ReactNode;
}

export default function AuthWrapper({ children }: AuthWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("refreshToken");

    if (token && pathname === "/") {
      router.replace("/main/dashboard"); // Use replace() to avoid infinite loop
      setTimeout(() => {
        setCheckingAuth(false);
      }, 2000);
      return;
    }
  }, [router, pathname]);

  if (checkingAuth) {
    return <Loading />;
  }

  return <>{children}</>;
}
