import { create } from "zustand";

interface BankDetails {
  accountID: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  bankAddress: string;
  swiftCode: string;
  routingNumber: string;
  beneficiaryAddress: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface CryptoWallet {
  accountID: string;
  networkID: {
    name: string;
    id: string;
  };
  address: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface BankCryptoStore {
  // type: string | null,
  bankDetails: BankDetails[]; // List of bank details
  cryptoWallets: CryptoWallet[]; // List of crypto wallets
  selectedBankId: string | null; // Add selectedBankId here
  selectedCryptoId: string | null;
  selectedType: "bank" | "crypto" | null;
  setBankDetails: (details: BankDetails[]) => void; // Function to set bank details
  setCryptoWallets: (wallets: CryptoWallet[]) => void; // Function to set crypto wallets
  deleteBank: (id: string) => void; //Function to delete a bank
  deleteWallet: (id: string) => void; // Function to delete a wallet
  setSelectedBankId: (id: string | null) => void; // Set selected bank ID
  setSelectedType: (type: "bank" | "crypto" | null) => void;
  setSelectedCryptoId: (id: string | null) => void | null;
  clearDetails: () => void; // Function to clear all details (optional)
}

const useBankCryptoStore = create<BankCryptoStore>((set) => ({
  bankDetails: [],
  cryptoWallets: [],
  selectedBankId: null, // Initialize selectedBankId
  selectedCryptoId: null,
  setBankDetails: (details) => set({ bankDetails: details }),
  setCryptoWallets: (wallets) => set({ cryptoWallets: wallets }),
  selectedType: null, // Initialize selectedType as null
  deleteBank: (id) =>
    set((state) => ({
      bankDetails: state.bankDetails.filter((bank) => bank.id !== id),
    })),
  deleteWallet: (id) =>
    set((state) => ({
      cryptoWallets: state.cryptoWallets.filter((wallet) => wallet.id !== id),
    })),
  setSelectedBankId: (id) => set({ selectedBankId: id }),
  setSelectedCryptoId: (id) => set({ selectedCryptoId: id }),
  setSelectedType: (type) => set({ selectedType: type }),
  clearDetails: () =>
    set({
      bankDetails: [],
      cryptoWallets: [],
      selectedBankId: null,
      selectedCryptoId: null,
      selectedType: null,
    }),
}));

export default useBankCryptoStore;
