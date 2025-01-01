import PostWrapper from "@/app/ui/posts-id/PostWrapper";
import { Suspense } from "react";
import CommentsWrapper from "@/app/ui/posts-id/CommentsWrapper";
import PostSkeleton from "@/app/ui/skeletons/feed/PostSkeleton";
import CommentsSkeleton from "@/app/ui/skeletons/comments/CommentsSkeleton";
import { Metadata } from "next";
import { getPost } from "@/app/lib/data";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  // todo: generateMetadata가 있을때 Suspense는 동작하지 않음(의도된 동작) generateMetadata suspense 로 검색
  { params }: Props
): Promise<Metadata> {
  const id = params.id;

  const post = await getPost(id);

  if (!post || post.length === 0) {
    return {
      title: "Post Not Found",
      description: "The requested post could not be found.",
    };
  }

  return {
    title: `${post[0].nickname} 님의 게시물`,
    description: post[0].content.substring(0, 160),
  };
}

export default function Post({ params }: { params: { id: string } }) {
  return (
    <div>
      <Suspense fallback={<PostSkeleton />}>
        <PostWrapper post_id={params.id} />
      </Suspense>
      <Suspense fallback={<CommentsSkeleton />}>
        <CommentsWrapper post_id={params.id} date={new Date()} />
      </Suspense>
    </div>
  );
}
