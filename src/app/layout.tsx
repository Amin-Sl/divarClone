import { ReactNode } from "react";

import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

import { Protected } from "@/components/layouts/Protected";
import { Provider } from "@/components/layouts/Provider";
import { vazir } from "@/utils/font";

import "@/styles/index.css";

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
      <body className={vazir.className}>
        <Toaster />
        <Provider>
          <Protected>{children}</Protected>
        </Provider>
      </body>
    </html>
  );
}
