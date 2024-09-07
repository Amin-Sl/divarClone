"use client";

import { useState, ChangeEvent, FormEvent } from "react";

import { Input, Button, Card } from "@nextui-org/react";

import { useSendPhoneNumberMutation } from "@/services/auth";

interface SendOtpFormProps {
  onSuccess: () => void;
}

export const SendOtpForm = ({ onSuccess }: SendOtpFormProps) => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [sendPhoneNumber, { isLoading, isSuccess, error }] =
    useSendPhoneNumberMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length === 11) {
      try {
        await sendPhoneNumber({ mobile: phoneNumber }).unwrap();
        localStorage.setItem("phoneNumber", phoneNumber);
        onSuccess();
      } catch (err) {
        console.error(err);
      }
    } else {
      console.error("شماره موبایل باید 11 رقم باشد.");
    }
  };

  return (
    <Card className="mx-auto mt-24 max-w-md rounded-lg border border-gray-300 p-8">
      <form onSubmit={handleSubmit}>
        <h2 className="mb-5 text-lg font-medium">ورود به حساب کاربری</h2>
        <h2 className="mb-5 text-sm text-gray-600">
          برای استفاده از امکانات دیوار، لطفاً شمارهٔ موبایل خود را وارد کنید.
          کد تأیید به این شماره پیامک خواهد شد.
        </h2>
        <Input
          placeholder="شماره موبایل"
          maxLength={11}
          minLength={11}
          fullWidth
          className="mb-5"
          value={phoneNumber}
          onChange={handleChange}
        />
        <Button
          type="submit"
          className="bg-danger font-thin"
          disabled={isLoading}
        >
          {isLoading ? "در حال ارسال..." : "کد تایید"}
        </Button>
        {isSuccess && <p className="mt-3 text-green-600">کد تایید ارسال شد.</p>}
        {error && (
          <p className="mt-3 text-red-600">
            خطایی رخ داد. لطفاً دوباره تلاش کنید.
          </p>
        )}
      </form>
    </Card>
  );
};
