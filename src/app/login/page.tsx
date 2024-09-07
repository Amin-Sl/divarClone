"use client";

import { useState } from "react";
import { SendOtpForm } from "@/components/otpForm";
import { CheckOtpForm } from "@/components/CheckotpForm";

const Page = () => {
  const [isOtpFormVisible, setIsOtpFormVisible] = useState<boolean>(false);

  return (
    <div>
      {!isOtpFormVisible ? (
        <SendOtpForm onSuccess={() => setIsOtpFormVisible(true)} />
      ) : (
        <CheckOtpForm />
      )}
    </div>
  );
};

export default Page;
