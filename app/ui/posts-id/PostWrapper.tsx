import Post from "../common/Post";
import Wrapper from "../common/Wrapper";
import { notFound } from "next/navigation";
import { getPost } from "@/app/lib/data";

export default async function PostWrapper({ post_id }: { post_id: string }) {
  const post = await getPost(post_id);
  console.log("postzz = ", post);
  if (!post) notFound();

  return (
    <Wrapper>
      {post && post.length > 0 && <Post post={post[0]} isTruncated={false} />}
    </Wrapper>
  );
}
