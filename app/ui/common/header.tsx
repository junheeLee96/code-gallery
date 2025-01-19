import Link from "next/link";
import AuthController from "../auth/AuthController";
import Image from "next/image";
import NewPost from "../home/NewPost";
import ThemeToggle from "./ThemeToggle";
import { auth } from "@/auth";

export default async function Header() {
  const session = await auth();
  return (
    <header
      className="fixed z-11 top-[0] left-[0] w-full bg-white 
      dark:bg-dark-bg h-[56px] shadow-md border-light-gray 
      dark:border-black border-b 
  "
    >
      <div className="w-full h-full flex items-center justify-between px-8">
        <Link href="/" className="inline-block">
          <Image
            src="/image/logo.png"
            priority
            width={100}
            height={80}
            alt="CodeGallery"
            style={{ width: "100%", height: "auto" }}
          />
        </Link>
        <div className="flex items-center gap-5">
          <ThemeToggle />
          <NewPost />
          {session?.user && (
            <Link
              href="/mypage"
              className="text-sm text-black dark:text-white hover:text-hover-text dark:hover:text-hover-text"
            >
              마이페이지
            </Link>
          )}
          <AuthController />
        </div>
      </div>
    </header>
  );
}
