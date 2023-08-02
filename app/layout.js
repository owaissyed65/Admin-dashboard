import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import { ModalProvider } from "@/Provider/modalProvider";
import "./globals.css";
import { ToastProvider } from "@/Provider/Toaster-Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({ children }) {
  
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ToastProvider/>
          <ModalProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
