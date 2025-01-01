import { getPost } from "@/app/lib/data";
// import { PostTypes } from "@/app/lib/definitions";
import Post from "../common/Post";
import Wrapper from "../common/Wrapper";

export default async function PostWrapper({ post_id }: { post_id: string }) {
  const post = await getPost(post_id);

  if (!post || post.length === 0) {
    return <div>Post not found</div>;
  }

  return (
    <Wrapper>
      <Post post={post[0]} />
    </Wrapper>
  );
}
