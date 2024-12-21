"use client";

import Link from "next/link";
import Button from "../common/Button";

export default function AuthController() {
  return (
    <div className="cursor-pointer">
      <Button>
        <Link href="/login">로그인하기</Link>
      </Button>
    </div>
  );
}
