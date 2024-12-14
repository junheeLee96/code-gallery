import Link from "next/link";
import Button from "../Button";
import { MessageSquareMore } from "lucide-react";

type AddCommentBtnProp = {
  post_id: number;
};

export default function AddCommentBtn({ post_id }: AddCommentBtnProp) {
  return (
    <Button>
      <Link
        href={`/posts/${post_id}`}
        className="inline-block w-full h-full flex items-center justify-center"
      >
        <MessageSquareMore />
        <span className="ml-2">댓글 남기기</span>
      </Link>
    </Button>
  );
}
// message - square - more;
