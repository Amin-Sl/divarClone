"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";

import { CheckOtpForm } from "@/components/CheckOtpForm";
import { SendOtpForm } from "@/components/SendOtpForm";
import { accessToken } from "@/utils/cookie";

export default function Page() {
  const [isOtpFormVisible, setIsOtpFormVisible] = useState<boolean>(false);

  const { push } = useRouter();
  if (accessToken) {
    push("/dashboard");
  }
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
