"use client";

import Link from "next/link";
import Button from "../common/Button";
import { signOut, useSession } from "next-auth/react";

export default function AuthController() {
  const { data: session } = useSession();
  return (
    <div className="cursor-pointer">
      {session?.user.nickname ? (
        <Button onClick={() => signOut({ callbackUrl: "/", redirect: true })}>
          <span>로그아웃</span>
        </Button>
      ) : (
        <Button>
          <Link href="/login">로그인하기</Link>
        </Button>
      )}
    </div>
  );
  // }

  // return <div>로그가웃</div>;
}
