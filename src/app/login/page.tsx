"use client";

import { useState } from "react";

import { SendOtpForm } from "@/components/otpForm";
import { CheckOtpForm } from "@/components/CheckotpForm";

export default function Page() {
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
}
