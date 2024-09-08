"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Button, Card } from "@nextui-org/react";
import { toast, Toaster } from "react-hot-toast";

import { useSendPhoneNumberMutation } from "@/services/auth";

import { SendOtpFormProps, FormValues } from "./types";

export const SendOtpForm = ({ onSuccess }: SendOtpFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [sendPhoneNumber, { isLoading }] = useSendPhoneNumberMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await sendPhoneNumber({ mobile: data.phoneNumber }).unwrap();
      sessionStorage.setItem("phoneNumber", data.phoneNumber);
      onSuccess();
      toast.success("کد تایید ارسال شد.");
    } catch (err) {
      toast.error("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
    }
  };

  return (
    <>
      <Toaster />

      <Card className="mx-auto mt-24 max-w-md rounded-lg border border-gray-300 p-8">
        <form onSubmit={handleSubmit(onSubmit)}>
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
            {...register("phoneNumber", {
              required: "وارد کردن شماره موبایل الزامی است.",
              pattern: {
                value: /^09\d{9}$/,
                message:
                  "شماره موبایل باید با 09 شروع شود و 11 رقم داشته باشد.",
              },
            })}
            errorMessage={errors.phoneNumber?.message}
          />
          <Button
            type="submit"
            className="bg-danger font-thin"
            disabled={isLoading}
          >
            {isLoading ? "در حال ارسال..." : "کد تایید"}
          </Button>
        </form>
      </Card>
    </>
  );
};
