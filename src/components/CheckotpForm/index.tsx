import { useState, ChangeEvent, FormEvent } from "react";
import { Input, Button, Card } from "@nextui-org/react";
import { toast } from "react-hot-toast";
import { useCheckOtpMutation } from "@/services/auth";
import { CheckOtpRes } from "@/services/types";
import { storeTokens } from "@/utils/cookie";

export const CheckOtpForm = () => {
  const [otp, setOtp] = useState<string>("");
  const [checkOtp, { isLoading, isSuccess, error }] = useCheckOtpMutation();

  const phoneNumber = sessionStorage.getItem("phoneNumber") || "";

  const handleOtpChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (otp.length === 5) {
      try {
        const { accessToken, refreshToken }: CheckOtpRes = await checkOtp({
          mobile: phoneNumber,
          code: otp,
        }).unwrap();

        storeTokens(accessToken, refreshToken);

        toast.success("کد تأیید صحیح است.");
      } catch (err) {
        toast.error("خطایی در بررسی کد تأیید رخ داد.");
      }
    } else {
      toast.error("کد تأیید باید 5 رقم باشد.");
    }
  };

  return (
    <Card className="mx-auto mt-24 max-w-md rounded-lg border border-gray-300 p-8">
      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <h2 className="text-lg font-medium">تأیید شماره موبایل</h2>
          <h2 className="text-sm text-gray-600">
            لطفاً کد تأیید دریافتی را وارد کنید.
          </h2>
          <Input
            placeholder="کد تأیید"
            maxLength={5}
            minLength={5}
            fullWidth
            value={otp}
            onChange={handleOtpChange}
            errorMessage="error"
          />
        </div>
        <Button
          type="submit"
          className="bg-danger font-thin"
          disabled={isLoading}
          {...{ isLoading }}
        >
          تأیید کد
        </Button>
        {isSuccess && (
          <p className="mt-3 text-green-600">کد تأیید صحیح است.</p>
        )}
        {error && <p className="mt-3 text-red-600">خطایی رخ داد:</p>}
      </form>
    </Card>
  );
};