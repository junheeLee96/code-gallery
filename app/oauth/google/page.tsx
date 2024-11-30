"use client";

import { getUserInfo } from "@/app/lib/data";
import { useEffect, useState } from "react";
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
  const [accessToken, setAccessToken] = useState<string | null>(null);
  //   const router = useRouter();

  const startGetUser = async (token: string) => {
    // todo: 토큰 저장
    const data = await getUserInfo(token);
    console.log(data);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hashParams = parseHash(window.location.hash);
      if (hashParams.access_token) {
        // const token = hashParams.access_token;
        startGetUser(hashParams.access_token);
        setAccessToken(hashParams.access_token);
        // 여기서 access token을 사용하거나 서버로 전송할 수 있습니다.
        // 예: API 호출 또는 상태 저장
      }
    }
  }, []);

  if (accessToken) {
    return <div>Access Token: {accessToken}</div>;
  }

  return <div>Loading...</div>;
}
