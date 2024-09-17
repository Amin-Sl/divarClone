"use client";

import { ReactNode, useEffect } from "react";

import { useNewTokenMutation } from "@/services/authApi";
import {
  accessToken,
  getExpirationTime,
  refreshToken,
  setTokens,
} from "@/utils/cookie";
// Get coockie func تعریف یک فانکشن برای گرفتن توکن به جای ایجاد متغیر
//  به جای گرفتن accessToken و  refreshToken

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

    const interval = setInterval(async () => {
      if (accessToken) {
        const expirationTime = getExpirationTime(accessToken);

        if (expirationTime) {
          const timeLeft = (expirationTime.getTime() - Date.now()) / 1000;

          if (timeLeft <= 5) {
            try {
              const response = await newToken().unwrap();
              if (response.accessToken) {
                setTokens(response.accessToken, response.refreshToken);
              }
            } catch (error) {
              console.error("Failed to refresh token", error);
            }
          }
        }
      }
    }, 4000);

    tokenApi();
    return () => clearInterval(interval);
  }, [newToken]);

  return <>{children}</>;
};
