import Link from "next/link";
import Wrapper from "../common/Wrapper";

export default function NewPost() {
  return (
    <Wrapper>
      <Link href="/post" className="w-full h-[60px] flex items-center">
        포스트 올리기
      </Link>
    </Wrapper>
  );
}
