"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SignUpForm from "../ui/sign-up/SignUpForm";

export default function SignUp() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }
  if (!session) {
    router.push("/login");
  }
  if (!session?.user.isNewUser) {
    router.push("/");
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <SignUpForm />
    </div>
  );
}
