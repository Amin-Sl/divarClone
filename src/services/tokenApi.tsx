"use client";

import { ReactNode, useEffect } from "react";

import { useNewTokenMutation } from "@/services/authApi";
import { accessToken, refreshToken, setTokens } from "@/utils/cookie";

export const Protected = ({ children }: { children: ReactNode }) => {
  const [newToken] = useNewTokenMutation();

  useEffect(() => {
    const tokenApi = async () => {
      if (refreshToken && !accessToken) {
        try {
          const response = await newToken().unwrap();
          if (response.accessToken) {
            setTokens(response.accessToken, response.refreshToken);
          }
        } catch (error) {
          return { error };
        }
      }
    };

    tokenApi();
  }, [newToken]);
  return children;
};
