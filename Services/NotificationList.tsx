"use client";
import { useNotificationStore } from "@/store/notificationStore";
import { useEffect, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NotificationList = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const displayedNotifications = useRef(new Set()); // Track displayed notifications

  useEffect(() => {
    notifications.forEach((notif) => {
      if (!displayedNotifications.current.has(notif.id)) {
        // Only show if not already displayed
        toast.info(<NotificationMessage title={notif.title} body={notif.body} />, {
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

  return <ToastContainer />;
};

const NotificationMessage = ({ title, body }: { title: string; body: string }) => (
  <div>
    <strong>{title}</strong>
    <p>{body}</p>
  </div>
);

export default NotificationList;
