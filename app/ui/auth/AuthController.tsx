"use client";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

export default function AuthController() {
  // todo: 로그인 판별 로직 작성
  return (
    <div className="cursor-pointer">
      <SignIn />
      <SignUp />
    </div>
  );
}
