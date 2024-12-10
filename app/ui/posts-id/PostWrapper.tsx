import { getPost } from "@/app/lib/data";
import { PostTypes } from "@/app/lib/definitions";
import Post from "../Post";

type PostWrapperTypes = {
  id: string;
};

export default async function PostWrap({ id }: PostWrapperTypes) {
  const post: PostTypes | null = await getPost(id);
  console.log(post);

  return <div>{post ? <Post post={post} /> : ""}</div>;
}
