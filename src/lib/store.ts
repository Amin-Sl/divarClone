import { configureStore } from "@reduxjs/toolkit";

import { otpAuth } from "@/services/auth";

export const store = configureStore({
  reducer: { [otpAuth.reducerPath]: otpAuth.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(otpAuth.middleware),
});
