import { CommentsTypes } from "@/app/lib/definitions";
import Markdown from "../common/post/Markdown";
import UserName from "../common/post/UserName";
import TimeAgo from "../common/post/TimeAgo";

type CommentProps = {
  comment: CommentsTypes;
};

export default function Comment({ comment }: CommentProps) {
  return (
    <div className="mb-8">
      <div>
        <UserName isAuthor={comment.isAuthor} username={comment.username} />
      </div>
      <Markdown language="" markdown={comment.comment} />
      <TimeAgo date={String(comment.reg_dt)} />
    </div>
  );
}
