import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

export const storeTokens = (accessToken: string, refreshToken: string) => {
  const cookieOptions = {
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
  };

  const accessTokenExpiration = getExpirationTime(accessToken);
  const refreshTokenExpiration = getExpirationTime(refreshToken);

  if (accessTokenExpiration) {
    const expiresInDays = Math.ceil(
      (accessTokenExpiration.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );
    Cookies.set("accessToken", accessToken, {
      ...cookieOptions,
      expires: expiresInDays,
    });
    console.log("Access Token Expiration:", accessTokenExpiration);
  } else {
    console.error("Failed to determine access token expiration.");
  }

  if (refreshTokenExpiration) {
    const expiresInDays = Math.ceil(
      (refreshTokenExpiration.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );
    Cookies.set("refreshToken", refreshToken, {
      ...cookieOptions,
      expires: expiresInDays,
    });
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
