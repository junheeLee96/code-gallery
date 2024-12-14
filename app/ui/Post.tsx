import { PostTypes } from "../lib/definitions";
import Markdown from "./Markdown";

type PostPropTypes = {
  post: PostTypes;
};

export default function Post({ post }: PostPropTypes) {
  return (
    <div>
      <Markdown markdown={post.content} language={post.language} />
    </div>
  );
}
