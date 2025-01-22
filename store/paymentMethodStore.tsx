import { create } from "zustand";

interface PaymentMethodState {
  selectedType: "bank" | "crypto" | "wallet" | null;
  setSelectedType: (type: "bank" | "crypto" | "wallet" | null) => void;
}

const usePaymentMethodStore = create<PaymentMethodState>((set) => ({
  selectedType: null,
  setSelectedType: (type) => set({ selectedType: type }),
}));

export default usePaymentMethodStore;
