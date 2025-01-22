"use client";
import { useEffect } from "react";
import { create } from "zustand";

// Define an interface for the store state
interface UserStore {
  fullName: string;
  setFullName: (name: string) => void;
  referralCode: string | null;
  setReferralCode: (code: string) => void;
}

// Create your Zustand store
const useUserStore = create<UserStore>((set) => ({
  fullName: "", // Default value, will be updated in useEffect
  referralCode: null,
  setFullName: (name) => {
    set({ fullName: name });
    if (typeof window !== "undefined") {
      localStorage.setItem("fullName", name); // Save to localStorage when it's updated
    }
  },
  setReferralCode: (code) => {
    set({ referralCode: code });
    if (typeof window !== "undefined") {
      localStorage.setItem("referralCode", code); // Save to localStorage when it's updated
    }
  },
}));


// Create a hook to load the full name from localStorage
export const useLoadFullName = () => {
  const setFullName = useUserStore((state) => state.setFullName);
  const setReferralCode = useUserStore((state) => state.setReferralCode);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedName = localStorage.getItem("fullName");
      const storedReferralCode = localStorage.getItem("referralCode");
      if (storedName) {
        setFullName(storedName);
      }
      if (storedReferralCode) {
        setReferralCode(storedReferralCode);
      }
    }
  }, [setFullName, setReferralCode]);
};

export default useUserStore;
