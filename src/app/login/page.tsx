"use client";

import { useState } from "react";

import { CheckOtpForm } from "@/components/CheckOtpForm";
import { SendOtpForm } from "@/components/SendOtpForm";

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
