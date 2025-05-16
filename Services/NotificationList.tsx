"use client";
import { useNotificationStore } from "@/store/notificationStore";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NotificationList() {
  const notifications = useNotificationStore((state) => state.notifications);
  const displayedNotifications = useRef(new Set());

  useEffect(() => {
    notifications.forEach((notif) => {
      if (!displayedNotifications.current.has(notif.id)) {
        toast.success(<NotificationMessage title={notif.title} />, {
          toastId: notif.id,
          position: "top-right",
          autoClose: 3000,
        });
        displayedNotifications.current.add(notif.id);
      }
    });
  }, [notifications]);

  return null;
}

const NotificationMessage = ({ title }: { title: string }) => {
  const formattedTitle = title.replace(/(\d+)/g, "$$$1");
  return <div><strong>{formattedTitle}</strong></div>;
};
