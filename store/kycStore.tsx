import { create } from "zustand";

interface KycState {
  //Bank/Crypto Info Provided
  isBankDetailsProvided: boolean;
  setIsBankDetailsProvided: (status: boolean) => void;
  isCryptoDetailsProvided: boolean;
  setIsCryptoDetailsProvided: (status: boolean) => void;

  //Kyc Info Provided
  isValidIdProvided: boolean;
  setIsValidIdProvided: (status: boolean) => void;
  isNextOfKinProvided: boolean;
  setIsNextOfKinProvided: (status: boolean) => void;
  isProfilePictureProvided: boolean;
  setIsProfilePictureProvided: (status: boolean) => void;

  //isKyc Provided Function
  isKycProvided: boolean;
  updateKycProvidedState: () => void; 

  //isBank Provided Function
  isBankProvided: boolean;
  updateBankInfoProvidedState: () => void;

  userId: string | null;
  setUserId: (userId: string) => void;
}

export const useKycStore = create<KycState>((set, get) => ({
  isBankDetailsProvided: false,
  setIsBankDetailsProvided: (status) => {
    set({ isBankDetailsProvided: status });
    localStorage.setItem(`isBankDetailsProvided-${get().userId}`, String(status));
    get().updateBankInfoProvidedState();
  },

  isCryptoDetailsProvided: false,
  setIsCryptoDetailsProvided: (status) => {
    set({ isCryptoDetailsProvided: status });
    localStorage.setItem(`isCryptoDetailsProvided-${get().userId}`, String(status));
    get().updateBankInfoProvidedState();
  },

  isValidIdProvided: false,
  setIsValidIdProvided: (status) => {
    set({ isValidIdProvided: status });
    localStorage.setItem(`isValidIdProvided-${get().userId}`, String(status));
    get().updateKycProvidedState(); // Trigger update
  },

  isNextOfKinProvided: false,
  setIsNextOfKinProvided: (status) => {
    set({ isNextOfKinProvided: status });
    localStorage.setItem(`isNextOfKinProvided-${get().userId}`, String(status));
    get().updateKycProvidedState(); // Trigger update
  },

  isProfilePictureProvided: false,
  setIsProfilePictureProvided: (status) => {
    set({ isProfilePictureProvided: status });
    localStorage.setItem(`isProfilePictureProvided-${get().userId}`, String(status));
    get().updateKycProvidedState(); // Trigger update
  },
  
  // Computed state and updater
  isKycProvided: false,
  updateKycProvidedState: () => {
    const { isValidIdProvided, isNextOfKinProvided} = get();
    const isKycProvided = isValidIdProvided && isNextOfKinProvided
    set({ isKycProvided });
  },

  isBankProvided: false,
  updateBankInfoProvidedState() {
    const {isBankDetailsProvided, isCryptoDetailsProvided} = get();
    const isBankProvided = isBankDetailsProvided || isCryptoDetailsProvided;
    set({isBankProvided});
  },
  userId: null as string | null, // Default value with type
  setUserId: (userId: string) => set({ userId }),
}));