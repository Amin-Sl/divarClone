"use client";

import { ReactNode } from "react";

import { Provider as ReduxProvider } from "react-redux";

import { store } from "@/redux/store";

export const Provider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
};
