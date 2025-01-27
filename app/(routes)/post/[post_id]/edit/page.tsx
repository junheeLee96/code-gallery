import { getPost } from "@/app/lib/server-data";
import UserName from "@/app/ui/common/post/UserName";
import Wrapper from "@/app/ui/common/Wrapper";
import PostForm from "@/app/ui/post/PostForm";
import { auth } from "@/auth";

interface EditPostPageProps {
  params: {
    post_id: string;
  };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const post_id = params.post_id;
  const post = await getPost(post_id);
  const session = await auth();
  return (
    <Wrapper className="mb-20">
      <div className="w-full h-full flex flex-col">
        <UserName username={session?.user.username as string} isAuthor={true} />
        <div className="flex-1 ">
          <PostForm isMarkdownRender={true} initialPost={post} />
        </div>
      </div>
    </Wrapper>
  );
}
