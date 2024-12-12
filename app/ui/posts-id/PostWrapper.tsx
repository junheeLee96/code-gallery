import { getPost } from "@/app/lib/data";
import { PostTypes } from "@/app/lib/definitions";
import Post from "../Post";

type PostWrapperTypes = {
  id: string;
};

export default async function PostWrap({ id }: PostWrapperTypes) {
  const post = await getPost(id);
  console.log("post = ", post);

  return <div>{post && post.length > 0 ? <Post post={post[0]} /> : ""}</div>;
}
