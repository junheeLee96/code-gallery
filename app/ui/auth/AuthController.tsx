"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function AuthController() {
  const { data: session } = useSession();
  return (
    <div className="cursor-pointer">
      {session?.user.nickname ? (
        <button onClick={() => signOut({ callbackUrl: "/", redirect: true })}>
          <span className="text-black dark:text-white hover:text-hover-text dark:hover:text-hover-text">
            로그아웃
          </span>
        </button>
      ) : (
        <button>
          <Link
            href="/login"
            className="text-black dark:text-white hover:text-hover-text dark:hover:text-hover-text"
          >
            로그인하기
          </Link>
        </button>
      )}
    </div>
  );
}
