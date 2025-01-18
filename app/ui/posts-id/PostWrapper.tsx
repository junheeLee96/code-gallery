import { getPost } from "@/app/lib/server-data";
import Post from "../common/post/Post";
import Wrapper from "../common/Wrapper";
import { notFound } from "next/navigation";

export default async function PostWrapper({ post_id }: { post_id: string }) {
  const post = await getPost(post_id);
  if (!post) notFound();

  return <Wrapper>{post && <Post post={post} isTruncated={false} />}</Wrapper>;
}
