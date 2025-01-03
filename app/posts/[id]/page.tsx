import PostWrapper from "@/app/ui/posts-id/PostWrapper";
import { Suspense } from "react";
import CommentsWrapper from "@/app/ui/posts-id/CommentsWrapper";
import PostSkeleton from "@/app/ui/skeletons/feed/PostSkeleton";
import CommentsSkeleton from "@/app/ui/skeletons/comments/CommentsSkeleton";
import { Metadata } from "next";
import { getPost } from "@/app/lib/data";
import Example from "./zz";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id;
  try {
    const post = await getPost(id);

    return {
      title: `${post[0].title}` || "Post",
      description: post[0].content.substring(0, 160),
    };
  } catch (e) {
    if (e instanceof Error && "statusCode" in e && e.statusCode === 404) {
      notFound();
    }
    console.error("An unexpected error occurred:", e);
    return {
      title: "Error",
      description: "There was an error loading this post.",
    };
  }
}

export default async function Post({ params }: { params: { id: string } }) {
  return (
    <div>
      {/* <Example /> */}
      <Suspense fallback={<PostSkeleton />}>
        <PostWrapper post_id={params.id} />
      </Suspense>
      <Suspense fallback={<CommentsSkeleton />}>
        <CommentsWrapper post_id={params.id} date={new Date()} />
      </Suspense>
    </div>
  );
}
