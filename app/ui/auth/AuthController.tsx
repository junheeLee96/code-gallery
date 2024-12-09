import Link from "next/link";

// import SignIn from "./SignIn";
// import SignUp from "./SignUp";

export default function AuthController() {
  return (
    <div className="cursor-pointer">
      <Link href="/login">로그인하기</Link>
    </div>
  );
}
