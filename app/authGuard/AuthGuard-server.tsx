import { auth } from "@/auth";
import { redirect } from "next/navigation";

type AuthGuardServerProps = {
  children: React.ReactNode;
};

export default async function AuthGuardServer({
  children,
}: AuthGuardServerProps) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return <>{children}</>;
}
