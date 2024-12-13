import Link from "next/link";

type AddCommentBtnProp = {
  post_id: number;
};

export default function AddCommentBtn({ post_id }: AddCommentBtnProp) {
  return <Link href={`/posts/${post_id}`}>댓글달기</Link>;
}
