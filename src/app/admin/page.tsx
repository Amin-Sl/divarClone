"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useWhoAmIQuery } from "@/services/auth";

const WhoAmIPage = () => {
  const { data, error, isLoading } = useWhoAmIQuery();

  const { push } = useRouter();

  useEffect(() => {
    if (data?.role === "ADMIN") {
      console.log("WhoAmI data:", data.role);
    }
    if (data?.role === "USER") {
      push("./dashboard");
    }
  }, [data, error]);
  if (isLoading) return <p>Loading...</p>;

  return <div>ADMIN</div>;
};

export default WhoAmIPage;
