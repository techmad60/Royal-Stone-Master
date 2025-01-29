import { create } from "zustand";

interface Notification {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  status: string;
}

interface NotificationStore {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  addNotification: (notification) => {
    console.log("🛎 Notification added to store:", notification);
    set((state) => ({
      notifications: [...state.notifications, notification],
    }));
  },
}));
