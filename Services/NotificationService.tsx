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
      // Add a manual notification for testing
    addNotification({
        id: "test",
        title: "Manual Notification",
        body: "Testing Zustand UI updates!",
        createdAt: new Date().toISOString(),
        status: "unread",
      });
      console.log("Pusher initialized:", pusher);
      const channelName = process.env.NEXT_PUBLIC_PUSHER_CHANNEL!;
      const channel = pusher.subscribe(channelName);
      console.log("Subscribed to channel:", channelName);
      console.log("Pusher Key:", process.env.NEXT_PUBLIC_PUSHER_KEY);
      console.log("Pusher Cluster:", process.env.NEXT_PUBLIC_PUSHER_CLUSTER);
      console.log("Pusher Channel:", process.env.NEXT_PUBLIC_PUSHER_CHANNEL);
      pusher.connection.bind("connected", () => {
        console.log("✅ Pusher is connected!");
      });
      pusher.connection.bind("disconnected", () => {
        console.log("❌ Pusher disconnected!");
      });
      pusher.connection.bind("error", (err: unknown) => {
        console.error("⚠️ Pusher error:", err);
      });

      const eventTypes = [
        "funding-approval",
        "funding-declined",
        "withdrawal-approval",
        "withdrawal-declined",
        "investment-maturity",
        "savings-maturity",
      ];

    //   eventTypes.forEach((eventType) => {
    //     channel.bind(eventType, (data: Notification) => {
    //       console.log(`📩 Received event: ${eventType}`, data);
    //       addNotification(data);
    //     });
    //   });
      
      
      // Catch all events (for debugging)
      channel.bind_global((event:string, data:Notification) => {
        console.log(`🌍 Received global event: ${event}`, data);
      
        // Extract the base event name by checking against known prefixes
        const matchedEvent = eventTypes.find((type) => event.startsWith(type));
      
        if (matchedEvent) {
          console.log(`✅ Matched event type: ${matchedEvent}`);
          console.log("🛎 Calling addNotification with data:", data);
          addNotification(data);
        } else {
          console.warn(`⚠️ Unrecognized event: ${event}`);
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
