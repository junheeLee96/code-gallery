import AuthGuard from "@/app/authGuard/\bAuthGuard";
import UserName from "@/app/ui/common/post/UserName";
import Wrapper from "@/app/ui/common/Wrapper";
import PostForm from "@/app/ui/post/PostForm";
import { auth } from "@/auth";

export default async function Post() {
  const session = await auth();
  return (
    <Wrapper>
      <AuthGuard>
        <div className="w-full h-full flex flex-col">
          <UserName
            nickname={session?.user.nickname as string}
            isAuthor={true}
          />
          <div className="flex-1 ">
            <PostForm isMarkdownRender={true} />
          </div>
        </div>
      </AuthGuard>
    </Wrapper>
  );
}
