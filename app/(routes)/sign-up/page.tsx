"use client";

import { useSession } from "next-auth/react";
import SignUpForm from "../../ui/sign-up/SignUpForm";
import { useRouter } from "next/navigation";
import AuthGuard from "@/app/authGuard/\bAuthGuard";

export default function SignUp() {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div data-testid="loading" />;
  }
  if (!session) {
    router.push("/login");
  }
  if (session?.user?.username) {
    router.push("/");
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <AuthGuard>
        <SignUpForm />
      </AuthGuard>
    </div>
  );
}
