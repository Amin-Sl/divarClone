"use client";

import { useLayoutEffect } from "react";

import { useRouter } from "next/navigation";
import { Oval } from "react-loader-spinner";

import { CategoryForm } from "@/components/CategoryForm";
import { CategoryList } from "@/components/CategoryList";
import { useWhoAmIQuery } from "@/services/authApi";
import { getCookie } from "@/utils/cookie";

export default function WhoAmIPage() {
  const { push } = useRouter();

  const accessToken = getCookie("accessToken");

  const { data, error, isLoading } = useWhoAmIQuery(undefined, {
    skip: !accessToken,
  });

  useLayoutEffect(() => {
    if (data?.role === "USER" || accessToken == null) {
      push("/dashboard");
    }
  }, [data, error, push]);

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Oval
          height={80}
          width={80}
          color="#10B981"
          wrapperStyle={{}}
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#4f46e5"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </div>
    );

  return (
    <>
      <CategoryForm />
      <CategoryList />
    </>
  );
}
