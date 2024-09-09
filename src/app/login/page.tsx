"use client";

import { useState } from "react";

import { CheckOtpForm } from "@/components/CheckotpForm";
import { SendOtpForm } from "@/components/OtpForm";

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
