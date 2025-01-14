import Link from "next/link";

export default function NewPost() {
  return (
    <div className="mr-3">
      <Link
        href="/post"
        className="w-full h-[60px] flex items-center text-black dark:text-white hover:text-hover-text dark:hover:text-hover-text "
      >
        새 글 작성하기
      </Link>
    </div>
  );
}
