"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Button from "../ui/common/Button";
import Image from "next/image";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <div className="flex items-center space-x-4">
        <p className="text-sm">Signed in as {session.user.email}</p>
        <button
          onClick={() => signOut({ callbackUrl: "/", redirect: true })}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign out
        </button>
      </div>
    );
  }
  return (
    <div className="h-full flex items-center justify-center ">
      <Button
        onClick={() => signIn("google", { callbackUrl: "/sign-up" })}
        className="font-bold py-2 px-4 rounded w-fit"
      >
        <Image
          src="/image/google_light.png"
          width={200}
          height={50}
          alt="구글로 로그인하기"
        />
      </Button>
    </div>
  );
}
