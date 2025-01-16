"use client";

import { useSession } from "next-auth/react";
import SignUpForm from "../../ui/sign-up/SignUpForm";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div data-testid="loading" />;
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
