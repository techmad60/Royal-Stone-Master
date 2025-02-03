// "use client"
// import { useNotificationStore } from "@/store/notificationStore";

// const NotificationList = () => {
//   const notifications = useNotificationStore((state) => state.notifications);

//   console.log("📢 Notifications in UI:", notifications); // Debugging log

//   return (
//     <div className="fixed top-4 right-4 bg-white p-4 shadow-lg rounded-md w-80">
//       {notifications.length === 0 ? (
//         <p>No notifications</p>
//       ) : (
//         notifications.map((notif) => (
//           <div key={notif.id} className="p-2 border-b">
//             <strong>{notif.title}</strong>
//             <p>{notif.body}</p>
//             <small>{new Date(notif.createdAt).toLocaleString()}</small>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default NotificationList;
