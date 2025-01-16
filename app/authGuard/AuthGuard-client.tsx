"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

type AuthGuardClient = {
  children: React.ReactNode;
};

export default function AuthGuardClient({ children }: AuthGuardClient) {
  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user?.id) {
      router.push("/login");
    }
  }, []);

  return { children };
}
