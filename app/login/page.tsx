"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Button from "../ui/common/Button";
import Image from "next/image";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="h-full flex items-center justify-center space-x-4">
        <Button
          onClick={() => signOut({ callbackUrl: "/", redirect: true })}
          className="font-bold py-2 px-4 rounded w-fit flex justify-center"
        >
          Sign out
        </Button>
      </div>
    );
  }
  return (
    <div className="h-full flex items-center justify-center ">
      <Button
        onClick={() => signIn("google", { callbackUrl: "/sign-up" })}
        className="font-bold py-2 px-4 rounded w-fit flex justify-center"
      >
        <Image
          src="/image/google_light.png"
          width={200}
          height={50}
          alt="구글로 로그인하기"
          style={{ width: "100%", height: "auto" }}
        />
      </Button>
    </div>
  );
}
