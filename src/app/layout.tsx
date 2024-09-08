import { ReactNode } from "react";

import type { Metadata } from "next";

import { Inter } from "next/font/google";

import { Provider } from "@/components/layouts/Provider";

import "@/styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Divar Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={inter.className}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
