import NotificationList from "@/Services/NotificationList";
// import AuthWrapper from "@/components/Registration/AuthWrapper";
import NotificationProvider from "@/Services/NotificationService";
import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "./globals.css";

export const metadata: Metadata = {
  title: "Royal Stone",
  icons: {
    icon: "/images/favicon.svg", // This path is relative to the public folder
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.className}`}>
      <head>
        <link rel="icon" type="image/svg+xml" href="/images/favicon.svg" />
      </head>
      <body>
        {children}
        <ToastContainer position="top-right" autoClose={3000} />
        <NotificationList />
        <NotificationProvider />
        {/* <AuthWrapper>{children}</AuthWrapper> Wrap children in AuthWrapper */}
      </body>
    </html>
  );
}
