import { CommentsTypes } from "@/app/lib/definitions";
import UserName from "../common/UserName";
import Markdown from "../common/post/Markdown";
import TimeAgo from "../common/TimeAgo";

type CommentProps = {
  comment: CommentsTypes;
};

export default function Comment({ comment }: CommentProps) {
  return (
    <div className="mb-8">
      <div>
        <UserName isAuthor={comment.isAuthor} nickname={comment.nickname} />
      </div>
      <Markdown language="" markdown={comment.comment} />
      <TimeAgo date={comment.reg_dt} />
    </div>
  );
}
