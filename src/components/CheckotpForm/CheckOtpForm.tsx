import { useState, ChangeEvent, FormEvent } from "react";

import { Input, Button, Card } from "@nextui-org/react";

import { useCheckOtpMutation } from "@/services/auth";
import { checkOtpRes } from "@/services/types";
import { storeTokens } from "@/utils/cookie";

export const CheckOtpForm = () => {
  const [otp, setOtp] = useState<string>("");
  const [checkOtp, { isLoading, isSuccess, error }] = useCheckOtpMutation();

  const phoneNumber = localStorage.getItem("phoneNumber") || "";

  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (otp.length === 5) {
      try {
        const response: checkOtpRes = await checkOtp({
          mobile: phoneNumber,
          code: otp,
        }).unwrap();

        storeTokens(response.accessToken, response.refreshToken);
      } catch (err) {
        console.error("Error verifying OTP:", err);
      }
    } else {
      console.error("کد تأیید باید 5 رقم باشد.");
    }
  };

  return (
    <Card className="mx-auto mt-24 max-w-md rounded-lg border border-gray-300 p-8">
      <form onSubmit={handleSubmit}>
        <h2 className="mb-5 text-lg font-medium">تأیید شماره موبایل</h2>
        <h2 className="mb-5 text-sm text-gray-600">
          لطفاً کد تأیید دریافتی را وارد کنید.
        </h2>
        <Input
          placeholder="کد تأیید"
          maxLength={5}
          minLength={5}
          fullWidth
          className="mb-5"
          value={otp}
          onChange={handleOtpChange}
        />
        <Button
          type="submit"
          className="bg-danger font-thin"
          disabled={isLoading}
        >
          {isLoading ? "در حال بررسی..." : "تأیید کد"}
        </Button>
        {isSuccess && <p className="mt-3 text-green-600">کد تأیید صحیح است.</p>}
        {error && <p className="mt-3 text-red-600">خطایی رخ داد:</p>}
      </form>
    </Card>
  );
};
