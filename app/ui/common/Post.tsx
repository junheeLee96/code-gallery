import { PostTypes } from "../../lib/definitions";
import Markdown from "./Markdown";
import UserName from "./UserName";

type PostPropTypes = {
  post: PostTypes;
};

export default function Post({ post }: PostPropTypes) {
  return (
    <div>
      <UserName
        nickname={post.nickname}
        isAuthor={post.isAuthor}
        reg_dt={post.reg_dt}
      />
      <Markdown markdown={post.content} language={post.language} />
    </div>
  );
}
