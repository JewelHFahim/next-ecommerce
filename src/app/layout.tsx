import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/componetns/Navbar";
import Footer from "@/componetns/Footer";
import { WixClientProvider } from "@/context/wixContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fire Cutter | Men's Shop",
  description: "Export Men's Collections",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WixClientProvider>
          <Navbar />
          {children}
          <Footer />
          <Toaster position="top-center" />
        </WixClientProvider>
      </body>
    </html>
  );
}
