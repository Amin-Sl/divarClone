import { Button, Card, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { useCheckOtpMutation } from "@/services/authApi";
import { setTokens } from "@/utils/cookie";

import { OtpType } from "./types";

export const CheckOtpForm = () => {
  const { push } = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<OtpType>();

  const [checkOtp, { isLoading }] = useCheckOtpMutation();

  const phoneNumber = sessionStorage.getItem("phoneNumber") || "";

  const onSubmit = async ({ otp }: OtpType) => {
    try {
      const { accessToken, refreshToken } = await checkOtp({
        mobile: phoneNumber,
        code: otp,
      }).unwrap();

      setTokens(accessToken, refreshToken);
      push("/dashboard");
      toast.success("ورود موفقیت آمیز بود");
    } catch (err) {
      toast.error("خطایی در کد تأیید رخ داد.");
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
            className=""
            classNames={{ input: "placeholder:!text-right" }}
            dir="ltr"
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
          isLoading={isLoading}
        >
          {isLoading ? "در حال بررسی..." : "تأیید کد"}
        </Button>{" "}
      </form>
    </Card>
  );
};
