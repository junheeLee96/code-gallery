import { auth } from "@/auth";
import { createPost } from "../lib/actions";
import PostForm from "../ui/post/PostForm";

export default async function Post() {
  return (
    <div className="w-full min-h-screen-without-header bg-red-500 p-2">
      <div className="w-full h-full flex flex-col">
        <div>ID등 넣는 곳</div>
        <div className="flex-1 bg-blue-500 ">
          <PostForm isMarkdownRender={true} action={createPost} />
        </div>
      </div>
    </div>
  );
}
