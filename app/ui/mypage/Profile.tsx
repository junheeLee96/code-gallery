import { getUser } from "@/app/lib/server-data";

export default async function Profile() {
  const user = await getUser();
  if (!user) return null;
  return <div className="text-xl font-bold">{user.username}님 반갑습니다.</div>;
}
