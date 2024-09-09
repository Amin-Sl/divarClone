import { getExpirationTime } from "@/utils/cookie";

import baseApi from "./api";
import {
  CheckOtpRes,
  NewTokenPayload,
  OtpRes,
  SendOtpRes,
  WhoAmIPayload,
} from "./types";

export const otpAuth = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendOtp: builder.mutation<OtpRes, SendOtpRes>({
      query: ({ mobile }) => ({
        url: "auth/send-otp",
        method: "POST",
        body: { mobile },
      }),
    }),
    checkOtp: builder.mutation<CheckOtpRes, OtpRes>({
      query: ({ mobile, code }) => ({
        url: "auth/check-otp",
        method: "POST",
        body: { mobile, code },
      }),
    }),
    newToken: builder.mutation<NewTokenPayload, void>({
      query: () => {
        const refreshToken = getExpirationTime("refreshToken");
        return {
          url: "auth/check-refresh-token",
          method: "POST",
          body: { refreshToken },
        };
      },
    }),
    whoAmI: builder.query<WhoAmIPayload, void>({
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
  useSendOtpMutation,
  useCheckOtpMutation,
  useNewTokenMutation,
  useWhoAmIQuery,
} = otpAuth;
