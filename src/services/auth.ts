import { getRefreshToken } from "@/utils/cookie";

import baseApi from "./api";
import {
  CheckOtpRes,
  NewTokenRes,
  OtpType,
  SendOtpPayload,
  WhoAmIRes,
} from "./types";

export const otpAuth = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendOtp: builder.mutation<OtpType, SendOtpPayload>({
      query: ({ mobile }) => ({
        url: "auth/send-otp",
        method: "POST",
        body: { mobile },
      }),
    }),
    checkOtp: builder.mutation<CheckOtpRes, OtpType>({
      query: ({ mobile, code }) => ({
        url: "auth/check-otp",
        method: "POST",
        body: { mobile, code },
      }),
    }),
    newToken: builder.mutation<NewTokenRes, void>({
      query: () => {
        return {
          url: "auth/check-refresh-token",
          method: "POST",
          body: { getRefreshToken },
        };
      },
    }),
    whoAmI: builder.query<WhoAmIRes, void>({
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
