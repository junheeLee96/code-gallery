import PostWrapper from "@/app/ui/posts-id/PostWrapper";
import { Suspense } from "react";
import CommentsWrapper from "@/app/ui/posts-id/CommentsWrapper";

export default async function Post(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  return (
    <div>
      <Suspense fallback={"...loading"}>
        <PostWrapper post_id={id} />
        <CommentsWrapper post_id={id} />
      </Suspense>
    </div>
  );
}
