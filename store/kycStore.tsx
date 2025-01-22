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

  //Bank/Crypto Modal Open
  isBankModalOpen: boolean;
  setIsBankModalOpen: (status: boolean) => void;
  isAddBankInfoModalOpen: boolean;
  setIsAddBankInfoModalOpen: (status: boolean) => void;
  isAddCryptoInfoModalOpen: boolean;
  setIsAddCryptoInfoModalOpen: (status: boolean) => void;

  //Kyc Modal Open
  isKycModalOpen: boolean;
  setIsKycModalOpen: (status: boolean) => void;
  isValidIdModalOpen: boolean;
  setIsValidIdModalOpen: (status: boolean) => void;
  isNextOfKinModalOpen: boolean;
  setIsNextOfKinModalOpen: (status: boolean) => void;
  isProfilePictureModalOpen: boolean;
  setIsProfilePictureModalOpen: (status: boolean) => void;

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
  
  //Modals State
  isBankModalOpen: false,
  setIsBankModalOpen: (status) => set({isBankModalOpen: status}),

  isKycModalOpen: false,
  setIsKycModalOpen: (status) => set({ isKycModalOpen: status }),

  isAddBankInfoModalOpen: false,
  setIsAddBankInfoModalOpen: (status) => set({ isAddBankInfoModalOpen: status }),

  isAddCryptoInfoModalOpen: false,
  setIsAddCryptoInfoModalOpen: (status) => set({ isAddCryptoInfoModalOpen: status }),

  isValidIdModalOpen: false,
  setIsValidIdModalOpen: (status) => set({ isValidIdModalOpen: status }),

  isNextOfKinModalOpen: false,
  setIsNextOfKinModalOpen: (status) => set({ isNextOfKinModalOpen: status }),

  isProfilePictureModalOpen: false,
  setIsProfilePictureModalOpen: (status) => set({ isProfilePictureModalOpen: status }),


  // Computed state and updater
  isKycProvided: false,
  updateKycProvidedState: () => {
    const { isValidIdProvided, isNextOfKinProvided, isProfilePictureProvided } = get();
    const isKycProvided = isValidIdProvided && isNextOfKinProvided && isProfilePictureProvided;
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
