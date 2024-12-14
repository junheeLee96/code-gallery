import Link from "next/link";
import Button from "../Button";

type AddCommentBtnProp = {
  post_id: number;
};

export default function AddCommentBtn({ post_id }: AddCommentBtnProp) {
  return (
    <Button>
      <Link href={`/posts/${post_id}`} className="inline-block w-full h-full ">
        댓글 남기기
      </Link>
    </Button>
  );
}
