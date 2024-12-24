import Link from "next/link";

export default function NewPost() {
  return (
    <div className="mr-3">
      <Link href="/post" className="w-full h-[60px] flex items-center">
        새 글 작성하기
      </Link>
    </div>
  );
}
