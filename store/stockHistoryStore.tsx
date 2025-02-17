import { StockPurchase } from '@/types/Type';
import { create } from 'zustand';

// interface Stock {
//   stockID: {
//     ticker: string;
//     name: string;
//     id: string;
//   };
//   accountID: string;
//   amount: number;
//   status: string;
//   createdAt: string;
//   updatedAt: string;
//   id: string;
// }

interface StockHistoryStore {
  stocks: StockPurchase[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  setCurrentPage: (page: number) => void;
  fetchStocks: (page?: number) => Promise<void>;
}

const useStockHistoryStore = create<StockHistoryStore>((set) => ({
  stocks: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  setCurrentPage: (page) => set({ currentPage: page }),
  fetchStocks: async (page = 1) => {
    try {
        set({ isLoading: true });
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        throw new Error('No access token found');
      }
      
      const response = await fetch(`https://api-royal-stone.softwebdigital.com/api/stock/purchase?page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
      });
      const result = await response.json();
      if (result.status) {
        set({ 
          stocks: result.data.data, 
          currentPage: page, 
          totalPages: result.data.totalPages
        });
        console.log("Fetched stocks:", result.data.data);
        console.log(accessToken)
      }
    } catch (error) {
      console.error('Error fetching stocks:', error);
      
    } finally {
        set({ isLoading: false });
      }
  },
}));

export default useStockHistoryStore;
