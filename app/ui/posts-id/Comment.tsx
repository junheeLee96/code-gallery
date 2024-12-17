import { CommentsTypes } from "@/app/lib/definitions";
import UserName from "../UserName";
import { timeAgo } from "@/app/lib/utils";

type CommentProps = {
  comment: CommentsTypes;
};

export default function Comment({ comment }: CommentProps) {
  console.log(comment);
  return (
    <div className="mb-2">
      <div>
        <UserName isAuthor={comment.isAuthor} nickname={comment.nickname} />
      </div>
      <div>{comment.comment}</div>
      <div className="mt-2 text-light-gary text-sm">
        {timeAgo(comment.reg_dt.toLocaleString())}
      </div>
    </div>
  );
}
