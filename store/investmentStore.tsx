import { create } from "zustand";

interface Investment {
  accountID: string;
  amount: number;
  type: string;
  status: string;
  productID?: {
    ROI?: {
      value: number;
      duration: number;
    };
    name: string;
    costPerUnit: number;
    images: string[];
    id: string;
  };
  slotPurchased?: number;
  maturityDate?: string;
  beneficiary?: string;
  paymentMade?: boolean;
  proofOfPayment?: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

interface InvestmentStore {
  investments: Investment[];
  currentPage: number;
  totalPages: number;
  totalDocuments: number;
  isLoading: boolean;
  error: string | { message: string } | null;
  investmentId: string | null;
  availableCash: number;
  setInvestmentId: (id: string | null) => void;
  setAvailableCash: (cash: number) => void;
  fetchInvestments: (type: string, page?: number) => Promise<void>;
  setCurrentPage: (page: number) => void;
}

const useInvestmentStore = create<InvestmentStore>((set) => ({
  investments: [],
  currentPage: 1,
  totalPages: 1,
  totalDocuments: 0,
  isLoading: false,
  error: null,
  investmentId: null,
  availableCash: 0,
  setAvailableCash: (cash) => set({ availableCash: cash }),
  setInvestmentId: (id) => set({ investmentId: id }),
  fetchInvestments: async (type = "", page = 1) => {
    set({ isLoading: true, error: null }); // Start loading
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `https://api-royal-stone.softwebdigital.com/api/investment?type=${type}&page=${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.status) {
        set({
          investments: data.data.data,
          currentPage: page,
          totalPages: data.data.totalPages,
          totalDocuments: data.data.totalDocuments,
        });
      } else {
        set({ error: "Failed to fetch investments." });
      }
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred.";
      set({ error: errorMessage });
    } finally {
      set({ isLoading: false }); // Loading complete
    }
  },
  setCurrentPage: (page) => set({ currentPage: page }), // Update currentPage
}));

export default useInvestmentStore;
