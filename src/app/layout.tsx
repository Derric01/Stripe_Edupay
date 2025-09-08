import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ConvexClientProvider } from "@/component/providers/ConvexClientProvider";
import Navbar from "@/component/Navbar";
import { Toaster } from "@/component/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "EduPay - Transform Your Skills",
  description: "Premium courses with secure payment processing. Learn from industry experts and advance your career.",
};

// ...existing code...
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-full bg-gradient-to-br from-slate-50 to-indigo-50`}>
        <ConvexClientProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
          </div>
          <Toaster />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
