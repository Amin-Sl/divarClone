import Cookies from "js-cookie";

import jwt from "jsonwebtoken";
export const storeTokens = (accessToken: string, refreshToken: string) => {
  const cookieOptions = {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  };

  Cookies.set("accessToken", accessToken, { ...cookieOptions, expires: 1 });
  Cookies.set("refreshToken", refreshToken, { ...cookieOptions, expires: 7 });

  console.log("Tokens stored in cookies successfully");

  const accessTokenExpiration = getExpirationTime(accessToken);
  const refreshTokenExpiration = getExpirationTime(refreshToken);

  if (accessTokenExpiration) {
    console.log("Access Token Expiration:", accessTokenExpiration);
  } else {
    console.error("Failed to determine access token expiration.");
  }

  if (refreshTokenExpiration) {
    console.log("Refresh Token Expiration:", refreshTokenExpiration);
  } else {
    console.error("Failed to determine refresh token expiration.");
  }
};

export const getAccessToken = Cookies.get("accessToken");

export const getExpirationTime = (token: string): Date | null => {
  try {
    const decoded = jwt.decode(token) as { exp: number } | null;
    if (decoded?.exp) {
      return new Date(decoded.exp * 1000);
    } else {
      console.error("Invalid token or no expiration time found.");
      return null;
    }
  } catch (err) {
    console.error("Error decoding token:", err);
    return null;
  }
};