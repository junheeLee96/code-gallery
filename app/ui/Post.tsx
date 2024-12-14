import { PostTypes } from "../lib/definitions";
import Markdown from "./Markdown";

type PostPropTypes = {
  post: PostTypes;
};

export default function Post({ post }: PostPropTypes) {
  console.log(post);
  return (
    <div>
      <Markdown markdown={post.content} />
    </div>
  );
}
