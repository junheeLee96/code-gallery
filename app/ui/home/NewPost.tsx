import PostWrapper from "../PostWrapper";
import Link from "next/link";

export default function NewPost() {
  return (
    <PostWrapper>
      <Link href="/post" className="w-full h-[60px] flex items-center">
        포스트 올리기
      </Link>
    </PostWrapper>
  );
}
