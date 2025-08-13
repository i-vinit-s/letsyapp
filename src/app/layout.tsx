import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Barlow } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  title: "Let´sYapp — Anonymous College Confessions",
  description: "Share your thoughts anonymously and securely with Let´sYapp.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Let´sYapp — Anonymous College Confessions",
    description:
      "Post, react, and discover confessions without revealing your identity.",
    url: "https://letsyapp.fun",
    siteName: "Let´sYapp",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className={`${barlow.variable} bg-white text-gray-900`}>
          {/* This wrapper will handle smooth scrolling */}
          <ClientLayoutWrapper>
            <Navbar />
            <main className="min-h-screen bg-white text-black">{children}</main>
            <Footer />
          </ClientLayoutWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
