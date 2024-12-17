import { CommentsTypes } from "@/app/lib/definitions";
import UserName from "../UserName";
import Markdown from "../Markdown";
import TimeAgo from "../TimeAgo";

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
      <Markdown language="" markdown={comment.comment} />
      <TimeAgo date={comment.reg_dt} />
    </div>
  );
}
