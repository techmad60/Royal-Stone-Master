import { Stock } from "@/types/Type";
import { create } from "zustand";

interface StockStore {
  stocks: Stock[];
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string;
  fetchStocks: (page?: number) => Promise<void>;
  setCurrentPage: (page: number) => void;
}

export const useStockStore = create<StockStore>((set) => ({
  stocks: [],
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: "",

  fetchStocks: async (page = 1) => {
    set({ loading: true, error: "" });

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`https://api-royal-stone.softwebdigital.com/api/stock?page=${page}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.status) {
        set({
          stocks: data.data.data,
          currentPage: page,
          totalPages: data.data.totalPages,
        });
        
      } else {
        set({ error: "Failed to fetch stocks." });
      }
    } catch (error) {
      set({ error: "An error occurred while fetching stocks." });
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },
  setCurrentPage: (page) => set({ currentPage: page }), // Update currentPage
}));
