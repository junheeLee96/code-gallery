import { getPost } from "@/app/lib/data";
// import { PostTypes } from "@/app/lib/definitions";
import Post from "../Post";
import Wrapper from "../Wrapper";

type PostWrapperTypes = {
  post_id: string;
};

export default async function PostWrap({ post_id }: PostWrapperTypes) {
  const post = await getPost(post_id);

  // todo: post_id 내용이 없을 때 처리
  return (
    <Wrapper>{post && post.length > 0 ? <Post post={post[0]} /> : ""}</Wrapper>
  );
}
