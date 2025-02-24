"use client";
import { useNotificationStore } from "@/store/notificationStore";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NotificationList() {
  const notifications = useNotificationStore((state) => state.notifications);
  const displayedNotifications = useRef(new Set()); // Track displayed notifications
  const pathname = usePathname(); // Get current path

  // Only render notifications inside /main
  if (!pathname.startsWith("/main")) return null;

  useEffect(() => {
    notifications.forEach((notif) => {
      if (!displayedNotifications.current.has(notif.id)) {
        toast.success(<NotificationMessage title={notif.title} />, {
          toastId: notif.id, // Ensures no duplicate toasts
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        displayedNotifications.current.add(notif.id); // Mark as shown
      }
    });
  }, [notifications]);

  return null; // No need to return UI since ToastContainer is already in RootLayout
}

const NotificationMessage = ({ title }: { title: string }) => {
  const formattedTitle = title.replace(/(\d+)/g, "$$$1"); // Adds $ before any number
  return <div><strong className="text-color-zero">{formattedTitle}</strong></div>;
};
