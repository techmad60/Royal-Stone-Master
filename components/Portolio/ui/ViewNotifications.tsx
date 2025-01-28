"use client";

import PortfolioNavigator from "@/components/Portolio/ui/PortfolioNavigator";
import Loading from "@/components/ui/Loading";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Notification {
  id: string;
  title: string;
  body: string;
  createdAt: string;
}

export default function ViewNotification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notification, setNotification] = useState<Notification | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const notificationId = searchParams.get("notificationId");

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("accessToken");
      try {
        const response = await fetch(
          "https://api-royal-stone.softwebdigital.com/api/notification",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        if (data.status) {
          setNotifications(data.data.data);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    if (notificationId && notifications.length > 0) {
      const foundNotification = notifications.find(
        (notif) => notif.id === notificationId
      );
      setNotification(foundNotification || null); // Set to null if not found
    }
  }, [notifications, notificationId]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (!notification) {
    return <p>Notification not found</p>;
  }

  return (
    <div>
      <PortfolioNavigator currentStep={2} />
      <div className="my-3 mt-7 flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:items-center lg:gap-32 lg:mt-12">
        <h1 className="text-base text-color-zero font-semibold lg:text-[18px]">
          {notification.title}
        </h1>
        <p className="text-xs text-[rgba(107,115,133,0.7)] tracking-tight">
          {new Date(notification.createdAt).toLocaleDateString() ===
          new Date().toLocaleDateString()
            ? `Today, ${new Date(notification.createdAt).toLocaleTimeString(
                "en-US",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true, // 12-hour format with AM/PM
                }
              )}`
            : new Date(notification.createdAt).toLocaleDateString("en-GB") +
              ", " +
              new Date(notification.createdAt).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
        </p>
      </div>
      <hr />
      <section className="lg:w-[589px]">
        <p className="text-sm text-color-form leading-[30px] mt-4 lg:text-base">
          {notification.body.length
            ? `${notification.body.replace(/(\d+)/, "$$$1")}`
            : notification.body}.
        </p>
      </section>
    </div>
  );
}
