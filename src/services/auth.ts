import baseApi from "./api";

import { getExpirationTime } from "@/utils/cookie";

import { OTP, SendOtpRes, CheckOtpRes, NewTokenPayload , WhoAmIPayload } from "./types";

export const otpAuth = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendPhoneNumber: builder.mutation<OTP, SendOtpRes>({
      query: ({ mobile }) => ({
        url: "auth/send-otp",
        method: "POST",
        body: { mobile },
      }),
    }),
    checkOtp: builder.mutation<CheckOtpRes, OTP>({
      query: ({ mobile, code }) => ({
        url: "auth/check-otp",
        method: "POST",
        body: { mobile, code },
      }),
    }),
    newToken: builder.mutation<NewTokenPayload, void>({
      query: () => {
        const refreshToken = getExpirationTime("refreshToken");
        if (!refreshToken) return { url: "", method: "POST", body: {} };
        return {
          url: "auth/check-refresh-token",
          method: "POST",
          body: { refreshToken },
        };
      },
    }),
    whoAmI: builder.query<WhoAmIPayload , void>({
      query: () => {
        return {
          url: "user/whoami",
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useSendPhoneNumberMutation,
  useCheckOtpMutation,
  useNewTokenMutation,
  useWhoAmIQuery,
} = otpAuth;