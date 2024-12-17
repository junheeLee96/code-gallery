import { auth } from "@/auth";
import PostForm from "../ui/post/PostForm";
import UserName from "../ui/UserName";
import Wrapper from "../ui/Wrapper";

export default async function Post() {
  const session = await auth();
  console.log(session);
  return (
    <Wrapper>
      <div className="w-full h-full flex flex-col">
        {/* <div>ID등 넣는 곳</div> */}
        <UserName nickname={session?.user.nickname as string} isAuthor={true} />
        <div className="flex-1 ">
          <PostForm isMarkdownRender={true} />
        </div>
      </div>
    </Wrapper>
  );
}
