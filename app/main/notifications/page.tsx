"use client";
// import PortfolioNavigator from "@/components/Portolio/ui/PortfolioNavigator";
import Icon from "@/components/ui/Icon";
import Loading from "@/components/ui/Loading";
import NoHistory from "@/components/ui/NoHistory";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";

interface Notification {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  status: string;
}

export default function Notification() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch initial notifications
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

  const groupNotificationsByDate = (notifications: Notification[]) => {
    const grouped: Record<string, Notification[]> = {};

    notifications.forEach((notification) => {
      const date = new Date(notification.createdAt).toLocaleDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(notification);
    });

    return grouped;
  };

  const groupedNotifications = groupNotificationsByDate(notifications);

  const markAsRead = async (notificationId: string) => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.error("No access token found!");
      return;
    }

    try {
      const response = await fetch(
        "https://api-royal-stone.softwebdigital.com/api/notification",
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            notificationID: notificationId, // Correct payload structure
            status: "read",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }

      // Update UI: Set the notification as "read"
      setNotifications((prev) =>
        prev.map((notif) =>
          notif.id === notificationId ? { ...notif, status: "read" } : notif
        )
      );

      // Navigate to notification details page
      router.push(
        `/main/notifications/view-notification?notificationId=${notificationId}`
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="lg:mt-24">
      {/* <PortfolioNavigator currentStep={1} /> */}
      <p className="font-semibold text-base my-4">Notifications</p>

      {notifications.length === 0 ? (
        <div className="lg:mr-8">
          <NoHistory icon={<FaBell />} text="You have no notifications" />
        </div>
      ) : (
        <div>
          {Object.entries(groupedNotifications).map(
            ([date, notificationsForDate]) => (
              <div key={date}>
                <div className="lg:hidden">
                  <p className="text-sm text-color-form pb-3">{date}</p>
                  <hr />
                </div>
                {notificationsForDate.map((notification) => (
                  <button
                  // href=""
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className="flex my-6 items-end bg-light-grey p-[8px] shadow-sm rounded-[14.85px] w-full lg:w-[572px] lg:h-[67px] lg:justify-between lg:items-center lg:rounded-common lg:p-6"
                  >
                    <div className="flex gap-2 lg:gap-4">
                      <Icon
                        icon={<FaBell className="text-2xl text-color-one" />}
                        containerSize="w-[39.6px] h-[39.6px] rounded-[14.85px] bg-[rgba(241,255,240,1)] flex-shrink-0"
                      />
                      <div className="flex flex-col items-start">
                        <p className="text-sm text-color-zero font-medium tracking-tight">
                          {notification.title}
                        </p>
                        <p className="text-sm text-color-form">
                          {notification.body.length > 20
                            ? `${notification.body
                                .slice(0, 20)
                                .replace(/(\d+)/, "$$$1")}...`
                            : notification.body}
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <p className="hidden lg:flex text-sm text-[rgba(107,115,133,1)] mr-2">
                        {new Date(
                          notification.createdAt
                        ).toLocaleDateString() ===
                        new Date().toLocaleDateString()
                          ? "Today"
                          : new Date(notification.createdAt).toLocaleDateString(
                              "en-GB"
                            )}
                      </p>
                      <p className="text-xs text-[rgba(107,115,133,0.7)] tracking-tight">
                        {new Date(notification.createdAt).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true, // 12-hour format with AM/PM
                          }
                        )}
                      </p>
                      {/* Status Dot */}
                      {notification.status && (
                        <span
                          className={`absolute -top-4 right-0 transform translate-x-[50%] -translate-y-[50%] w-[8px] h-[8px] rounded-full lg:-top-0 ${
                            notification.status === "delivered"
                              ? "bg-green-700"
                              : notification.status === "read"
                              ? "bg-light-grey"
                              : ""
                          }`}
                        ></span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
