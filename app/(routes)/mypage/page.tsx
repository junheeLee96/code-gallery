import AuthGuard from "@/app/authGuard/\bAuthGuard";
import History from "@/app/ui/mypage/History";
import Profile from "@/app/ui/mypage/Profile";

export default function Mypage() {
  return (
    <AuthGuard>
      <div className="w-full mt-5">
        <Profile />
        <History />
      </div>
    </AuthGuard>
  );
}
