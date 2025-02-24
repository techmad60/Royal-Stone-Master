"use client";
import { useNotificationStore } from "@/store/notificationStore";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificationList = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const displayedNotifications = useRef(new Set()); // Track displayed notifications

  useEffect(() => {
    notifications.forEach((notif) => {
      if (!displayedNotifications.current.has(notif.id)) {
        // Only show if not already displayed
        toast.success(<NotificationMessage title={notif.title}/>, {
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

  // return <ToastContainer />;
};

const NotificationMessage = ({ title }: { title: string; }) => {
  const formattedTitle = title.replace(/(\d+)/g, "$$$1"); // Adds $ before any number
  console.log("Title", formattedTitle)

  return (
    <div>
      <strong className="text-color-zero">{formattedTitle}</strong>
    </div>
  );
};

export default NotificationList;
