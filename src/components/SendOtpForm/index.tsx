"use client";

import { Button, Card, Input } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { useSendOtpMutation } from "@/services/authApi";

import { FormValues, SendOtpFormProps } from "./types";

export const SendOtpForm = ({ onSuccess }: SendOtpFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const [sendPhoneNumber, { isLoading }] = useSendOtpMutation();

  const onSubmit: SubmitHandler<FormValues> = async ({ phoneNumber }) => {
    try {
      await sendPhoneNumber({ mobile: phoneNumber }).unwrap();
      sessionStorage.setItem("phoneNumber", phoneNumber);
      onSuccess();
      toast.success("کد تایید ارسال شد.");
    } catch (err) {
      toast.error("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
    }
  };

  return (
    <Card className="mx-auto mt-24 max-w-md rounded-lg border border-gray-300 p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5 flex flex-col gap-5">
          <h2 className="text-lg font-medium">ورود به حساب کاربری</h2>
          <h2 className="text-sm text-gray-600">
            برای استفاده از امکانات دیوار، لطفاً شمارهٔ موبایل خود را وارد کنید.
            کد تأیید به این شماره پیامک خواهد شد.
          </h2>
          <div>
            <Input
              placeholder="شماره موبایل"
              maxLength={11}
              minLength={11}
              fullWidth
              classNames={{ input: "placeholder:!text-right" }}
              dir="ltr"
              {...register("phoneNumber", {
                required: "وارد کردن شماره موبایل الزامی است.",
                pattern: {
                  value: /^09\d{9}$/,
                  message: "فرمت شماره موبایل صحیح نیست",
                },
              })}
              isInvalid={!!errors.phoneNumber}
              errorMessage={errors.phoneNumber?.message}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="bg-danger font-thin"
          isLoading={isLoading}
        >
          {isLoading ? "در حال ارسال..." : "کد تایید"}
        </Button>
      </form>
    </Card>
  );
};
