import PostWrapper from "@/app/ui/posts-id/PostWrapper";
import { Suspense } from "react";
import CommentsWrapper from "@/app/ui/posts-id/CommentsWrapper";
import PostSkeleton from "@/app/ui/skeletons/feed/PostSkeleton";
import CommentsSkeleton from "@/app/ui/skeletons/comments/CommentsSkeleton";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost } from "@/app/lib/server-data";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post_id = params.id;
  try {
    // 서버 컴포넌트는 api route를 사용 못함 (https://nextjs-faq.com/fetch-api-in-rsc)
    // api route는 클라이언트 컴포넌트를 위한 것이므로 직접 db에 접근하여 성능향상(api route를 거치지 않기에 불필요한 네트워크 방지)

    // const post = await getPost(id);
    const post = await getPost(post_id);
    if (!post) {
      return {
        title: "페이지를 찾을 수 없습니다.",
        description: "페이지를 찾을 수 없습니다.",
      };
    }

    return {
      title: `${post[0].title}` || "",
      description: post[0].content.substring(0, 150),
    };
  } catch (e) {
    if (e instanceof Error && "statusCode" in e && e.statusCode === 404) {
      notFound();
    }
    console.error("An unexpected error occurred:", e);
    return {
      title: "페이지를 찾을 수 없습니다.",
      description: "페이지를 찾을 수 없습니다.",
    };
  }
}

export default async function Post({ params }: { params: { id: string } }) {
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
