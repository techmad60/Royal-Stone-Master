import { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";


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
        {children}</body>
    </html>
  );
}
