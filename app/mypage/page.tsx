import { auth } from "@/auth";
import Profile from "../ui/mypage/Profile";
import UserPosts from "../ui/mypage/user-posts";

export default function Mypage() {
  const session = auth();
  console.log(session);
  return (
    <div>
      <Profile />
      <UserPosts />
    </div>
  );
}
