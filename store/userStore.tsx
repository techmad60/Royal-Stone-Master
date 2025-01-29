import { useEffect } from "react";
import { create } from "zustand";

interface UserStore {
  fullName: string;
  setFullName: (name: string) => void;
  referralCode: string | null;
  setReferralCode: (code: string) => void;
}

const useUserStore = create<UserStore>((set) => ({
  fullName: "", // Default value
  referralCode: null,
  setFullName: (name) => {
    set({ fullName: name });
    // Only access localStorage in the client-side
    if (typeof window !== "undefined") {
      localStorage.setItem("fullName", name); 
    }
  },
  setReferralCode: (code) => {
    set({ referralCode: code });
    // Only access localStorage in the client-side
    if (typeof window !== "undefined") {
      localStorage.setItem("referralCode", code); 
    }
  },
}));

// Load fullName and referralCode from localStorage on mount
export const useLoadFullName = () => {
  const setFullName = useUserStore((state) => state.setFullName);
  const setReferralCode = useUserStore((state) => state.setReferralCode);

  useEffect(() => {
    // Ensure localStorage access only happens in the browser
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
