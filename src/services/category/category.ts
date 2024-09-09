import baseApi from "../api";

import { categoryRes } from "./type";

export const category = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendOtp: builder.mutation<categoryRes, categoryRes>({
      query: ({ name, icon }) => ({
        url: "auth/category",
        method: "POST",
        body: { name, icon },
      }),
    }),
  }),
});
export const { useSendOtpMutation } = category;
