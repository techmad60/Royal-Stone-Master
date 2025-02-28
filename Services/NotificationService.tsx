"use client";

import { useNotificationStore } from "@/store/notificationStore";
import Pusher from "pusher-js";
import { useEffect, useRef } from "react";

interface Notification {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  status: string;
}

export default function NotificationProvider() {
  const addNotification = useNotificationStore(
    (state) => state.addNotification
  );
  const pusherRef = useRef<Pusher | null>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    console.log("UserId from localStorage:", userId); // Log userId

    if (!userId) {
      console.error("UserId not found in localStorage");
      return;
    }

    if (!pusherRef.current) {
      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      });

      // Append userId to the channel name to make it user-specific
      const channelName = `${process.env.NEXT_PUBLIC_PUSHER_CHANNEL!}`;
      console.log("Subscribing to channel:", channelName); // Log channel name

      const channel = pusher.subscribe(channelName);

      const eventTypes = [
        "funding-approval",
        "funding-declined",
        "withdrawal-approval",
        "withdrawal-declined",
        "investment-maturity",
        "savings-maturity",
      ];

      // Catch all events (for debugging)
      channel.bind_global((event: string, data: Notification) => {
        console.log("Received event:", event); // Log the event type
        console.log("Notification data:", data); // Log the notification data

        // Extract the base event name and the event userId
        const eventParts = event.split("-");
        const baseEvent = eventParts.slice(0, -1).join("-"); // e.g., "funding-approval"
        const eventUserId = eventParts[eventParts.length - 1]; // e.g., "678d2e106bd5ac1493149b27"

        console.log("Extracted base event:", baseEvent); // Log the extracted base event
        console.log("Extracted event userId:", eventUserId); // Log the extracted event userId

        // Check if the event is intended for the current user
        if (eventUserId !== userId) {
          console.log("Event is not for the current user. Skipping."); // Log if event is not for the current user
          return;
        }

        // Check if the base event matches any of the predefined event types
        const matchedEvent = eventTypes.find((type) => baseEvent === type);

        if (matchedEvent) {
          console.log("Matched event type:", matchedEvent); // Log matched event type
          addNotification(data);
        } else {
          console.log("Event type not matched:", event); // Log if event type is not matched
        }
      });

      pusherRef.current = pusher;

      return () => {
        console.log("Unsubscribing and disconnecting from Pusher"); // Log cleanup
        eventTypes.forEach((eventType) => channel.unbind(eventType));
        pusher.unsubscribe(channelName);
        pusher.disconnect();
      };
    }
  }, [addNotification]);

  return null; // This component does not render anything
}
