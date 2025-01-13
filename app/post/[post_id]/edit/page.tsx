import { getPost } from "@/app/lib/server-data";
import Wrapper from "@/app/ui/common/Wrapper";
import { auth } from "@/auth";
import { notFound } from "next/navigation";

interface EditPostPageProps {
  params: {
    post_id: string;
  };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const post_id = params.post_id;
  const post = await getPost(post_id);

  // 게시물이 없거나 작성자가 아니면
  if (!post || post.length === 0 || !post[0].isAuthor) notFound();
  return <Wrapper>gdgd</Wrapper>;
}
