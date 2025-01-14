import { auth } from "@/auth";
import PostForm from "../ui/post/PostForm";
import Wrapper from "../ui/common/Wrapper";
import UserName from "../ui/common/post/UserName";

export default async function Post() {
  const session = await auth();
  return (
    <Wrapper>
      <div className="w-full h-full flex flex-col">
        <UserName nickname={session?.user.nickname as string} isAuthor={true} />
        <div className="flex-1 ">
          <PostForm isMarkdownRender={true} />
        </div>
      </div>
    </Wrapper>
  );
}
