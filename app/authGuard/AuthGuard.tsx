import { auth } from "@/auth";
import { redirect } from "next/navigation";

type AuthGuardServerProps = {
  children: React.ReactNode;
  isSignUp?: boolean; //sign-up 페이지인가?
};

export default async function AuthGuard({
  children,
  isSignUp,
}: AuthGuardServerProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }
  if (!session?.user.username && !isSignUp) {
    redirect("/sign-up");
  }

  if (session?.user.username && isSignUp) {
    redirect("/");
  }

  return <>{children}</>;
}
