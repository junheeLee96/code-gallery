import PostWrapper from "@/app/ui/posts-id/PostWrapper";
import { Suspense } from "react";

export default async function Post(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  return (
    <div>
      <Suspense fallback={"...loading"}>
        <PostWrapper id={id} />
      </Suspense>
    </div>
  );
}
