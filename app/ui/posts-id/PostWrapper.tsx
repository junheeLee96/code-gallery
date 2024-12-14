import { getPost } from "@/app/lib/data";
// import { PostTypes } from "@/app/lib/definitions";
import Post from "../Post";

type PostWrapperTypes = {
  post_id: string;
};

export default async function PostWrap({ post_id }: PostWrapperTypes) {
  const post = await getPost(post_id);

  return <div>{post && post.length > 0 ? <Post post={post[0]} /> : ""}</div>;
}
