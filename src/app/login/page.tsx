"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";

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
