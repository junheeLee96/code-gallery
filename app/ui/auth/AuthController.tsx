import Link from "next/link";

// import SignIn from "./SignIn";
// import SignUp from "./SignUp";

export default function AuthController() {
  // todo: 로그인 판별 로직 작성
  return (
    <div className="cursor-pointer">
      {/* <button onClick={() => signIn("google")}>구글로 로그인하기</button> */}
      <Link href="/login">로그인하기</Link>
      {/* <SignIn />
      <SignUp /> */}
    </div>
  );
}
