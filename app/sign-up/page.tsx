"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { createNewUser } from "../lib/actions";
import { User } from "../lib/definitions";
import SignUpForm from "../ui/sign-up/SignUpForm";

export default function SignUp() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [nickname, setNickname] = useState("");

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  if (!session) {
    router.push("/login");
  }
  if (!session?.user.isNewUser) {
    router.push("/");
  }

  const onSuccess = async () => {
    router.push("/");
  };

  const onError = (err: Error) => {
    // todo: 에러 컨트롤
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <SignUpForm onSuccess={onSuccess} onError={onError} />
    </div>
  );
}
