"use client";

import { getUserInfo } from "@/app/lib/data";
import { useEffect } from "react";
// import { useRouter } from "next/navigation";

function parseHash(hash: string) {
  return Object.fromEntries(
    hash
      .slice(1)
      .split("&")
      .map((item) => item.split("="))
  );
}

export default function CallbackPage() {
  //   const router = useRouter();

  const startGetUser = async (token: string) => {
    // todo: 토큰 저장
    const data = await getUserInfo(token);
    if (data.isValid) {
      localStorage.setItem("token", token);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hashParams = parseHash(window.location.hash);
      if (hashParams.access_token) {
        startGetUser(hashParams.access_token);
      }
    }
  }, []);

  return <div>Loading...</div>;
}
