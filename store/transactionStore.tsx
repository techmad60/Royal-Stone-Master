import { create } from "zustand";
import {apiFetch} from "@/utils/apiHelper";

interface Transactions {
  id: string;
  accountID: string;
  amount: number;
  type: string;
  status: string;
  paymentMade?: boolean;
  beneficiary?: string;
  beneficiaryType?: string;
  beneficiaryID?: string;
  createdAt: string;
  updatedAt: string;
  proofOfPayment?: string;
}

interface TransactionStore {
  transactions: Transactions[];
  currentPage: number;
  totalPages: number;
  totalDocuments: number;
  isLoading: boolean;
  error: string | { message: string } | null;
  fetchTransactions: (page?: number, forceRefresh? : boolean) => Promise<void>;
  setCurrentPage: (page: number) => void;
}

const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  currentPage: 1,
  totalPages: 1,
  totalDocuments: 0,
  isLoading: false,
  error: null,

  fetchTransactions: async (page = 1) => {
    set({ isLoading: true, error: null }); // Start loading
    try {
      // const token = localStorage.getItem("accessToken");
      const response = await apiFetch(
        `/transaction?page=${page}`,
        {
          method: "GET",
          headers: {
            // Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.status) {
        set({
          transactions: data.data.data,
          currentPage: page,
          totalPages: data.data.totalPages,
          totalDocuments: data.data.totalDocuments,
        });
      } else {
        set({ error: "Failed to fetch data." });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred.";
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false }); // Loading complete
    }
  },

  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default useTransactionStore;
