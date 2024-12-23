import Link from "next/link";
import Wrapper from "../common/Wrapper";
import Button from "../common/Button";

export default function NewPost() {
  return (
    <Wrapper>
      <Button>
        <Link href="/post" className="w-full h-[60px] flex items-center">
          새 글 작성하기
        </Link>
      </Button>
    </Wrapper>
  );
}
