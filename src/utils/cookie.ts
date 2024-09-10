import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

export const setTokens = (accessToken: string, refreshToken: string) => {
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
  }

  if (refreshTokenExpiration) {
    const expiresInDays = Math.ceil(
      (refreshTokenExpiration.getTime() - Date.now()) / (1000 * 60 * 60 * 24),
    );
    Cookies.set("refreshToken", refreshToken, {
      ...cookieOptions,
      expires: expiresInDays,
    });
  }
};

export const accessToken = Cookies.get("accessToken");
export const refreshToken = Cookies.get("refreshToken");
export const getExpirationTime = (token: string): Date | null => {
  try {
    const decoded = jwt.decode(token) as { exp: number } | null;
    if (decoded?.exp) {
      return new Date(decoded.exp * 1000);
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
};
