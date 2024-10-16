import type { Metadata } from "next";
import { ClerkProvider, RedirectToSignUp, SignedIn, SignedOut } from "@clerk/nextjs";

import { ModalProvider } from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";

import localFont from "next/font/local";
import "./globals.css";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const geistSans = localFont({
  src: "../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Admin dashboard",
  description: "dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ToastProvider />
          <ModalProvider />
          {children}
          <SignedOut>
            <RedirectToSignUp/>
          </SignedOut>
        </body>
      </html>
    </ClerkProvider>
  );
}
