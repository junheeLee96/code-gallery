import { getPost } from "@/app/lib/server-data";
import UserName from "@/app/ui/common/UserName";
import Wrapper from "@/app/ui/common/Wrapper";
import PostForm from "@/app/ui/post/PostForm";
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
  const session = await auth();
  // 게시물이 없거나 작성자가 아니면
  if (!post || post.length === 0 || !post[0].isAuthor) notFound();
  return (
    <Wrapper>
      <div className="w-full h-full flex flex-col">
        <UserName nickname={session?.user.nickname as string} isAuthor={true} />
        <div className="flex-1 ">
          <PostForm isMarkdownRender={true} initialPost={post[0]} />
        </div>
      </div>
    </Wrapper>
  );
}
