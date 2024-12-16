import PostWrapper from "@/app/ui/posts-id/PostWrapper";
import { Suspense } from "react";
import CommentsWrapper from "@/app/ui/posts-id/CommentsWrapper";
import { getPost } from "@/app/lib/data";
import { Metadata, ResolvingMetadata } from "next";
import PostSkeleton from "@/app/ui/skeletons/feed/PostSkeleton";

// type Props = {
//   params: { id: string };
// };
export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPost(params.id);

  if (!post || post.length === 0) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post[0].nickname + " 님의 게시물",
    description: post[0].content.substring(0, 160),
  };
}

export default async function Post(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const date = new Date();
  return (
    <div>
      <Suspense fallback={<PostSkeleton />}>
        <PostWrapper post_id={id} />
      </Suspense>
      <CommentsWrapper post_id={id} date={date} />
    </div>
  );
}
