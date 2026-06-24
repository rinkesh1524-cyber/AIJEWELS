import "./globals.css";
import Sidebar from "../components/Sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AIJewels",
  description: "AI Powered Jewellery Management Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex bg-slate-100">
        <Sidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </body>
    </html>
  );
}