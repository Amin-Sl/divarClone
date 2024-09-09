import { Button, Card, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { useCheckOtpMutation } from "@/services/auth";
import { CheckOtpRes } from "@/services/types";
import { setCoockie } from "@/utils/cookie";

export const CheckOtpForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<{ otp: string }>();
  const [checkOtp, { isLoading, isSuccess, error }] = useCheckOtpMutation();

  const phoneNumber = sessionStorage.getItem("phoneNumber") || "";

  const onSubmit = async (data: { otp: string }) => {
    try {
      const { accessToken, refreshToken }: CheckOtpRes = await checkOtp({
        mobile: phoneNumber,
        code: data.otp,
      }).unwrap();

      setCoockie(accessToken, refreshToken);
      toast.success("کد تأیید صحیح است.");
    } catch (err) {
      toast.error("خطایی در بررسی کد تأیید رخ داد.");
    }
  };

  return (
    <Card className="mx-auto mt-24 max-w-md rounded-lg border border-gray-300 p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5 flex flex-col gap-5">
          <h2 className="text-lg font-medium">تأیید شماره موبایل</h2>
          <h2 className="text-sm text-gray-600">
            لطفاً کد تأیید دریافتی را وارد کنید.
          </h2>
          <Input
            placeholder="کد تأیید"
            maxLength={5}
            minLength={5}
            fullWidth
            {...register("otp", {
              required: "کد تأیید ضروری است.",
              minLength: {
                value: 5,
                message: "کد تأیید باید 5 رقم باشد.",
              },
              maxLength: {
                value: 5,
                message: "کد تأیید باید 5 رقم باشد.",
              },
            })}
            errorMessage={errors.otp?.message}
          />
        </div>
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
