import { Stock } from "@/types/Type";
import { create } from "zustand";
import { apiFetch } from "@/utils/apiHelper";

interface StockStore {
  stocks: Stock[];
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string;
  searchQuery: string;
  fetchStocks: (page?: number, query?: string) => Promise<void>;

  setCurrentPage: (page: number) => void;
  setSearchQuery: (query: string) => void;
}

export const useStockStore = create<StockStore>((set) => ({
  stocks: [],
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: "",
  searchQuery: "",

  fetchStocks: async (page = 1, query = "") => {
    set({ loading: true, error: "" });
  
    try {
      // const token = localStorage.getItem("accessToken");
      const response = await apiFetch(
        `/stock?page=${page}&search=${query}`,
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
          stocks: data.data.data,
          currentPage: page,
          totalPages: data.data.totalPages,
        });
      } else {
        set({ error: "Failed to fetch data." });
      }
    } catch (error) {
      set({ error: "An error occurred while fetching data." });
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  setCurrentPage: (page) => set({ currentPage: page }),

  setSearchQuery: (query) => set({ searchQuery: query }),
}));
