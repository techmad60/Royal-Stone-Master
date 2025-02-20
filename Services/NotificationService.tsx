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
    if (!pusherRef.current) {
      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      });

      const channelName = process.env.NEXT_PUBLIC_PUSHER_CHANNEL!;
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
        // Extract the base event name by checking against known prefixes
        const matchedEvent = eventTypes.find((type) => event.startsWith(type));

        if (matchedEvent) {
          addNotification(data);
        }
      });

      pusherRef.current = pusher;

      return () => {
        eventTypes.forEach((eventType) => channel.unbind(eventType));
        pusher.unsubscribe(channelName);
        pusher.disconnect();
      };
    }
  }, [addNotification]);

  return null; // This component does not render anything
}
