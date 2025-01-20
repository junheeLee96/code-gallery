import { InfiniteQueryResponse, PostTypes } from "@/app/lib/definitions";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

const postsPerPage = 12;

export async function GET(
  request: Request
): Promise<NextResponse<InfiniteQueryResponse<PostTypes[]>>> {
  const session = await auth();
  const useruuid = session?.user?.id;

  if (!useruuid) {
    return NextResponse.json(
      {
        data: [],
        nextCursor: null,
        totalPosts: 0,
        pageParams: 1,
      },
      { status: 404 }
    );
  }

  const { searchParams } = new URL(request.url);
  const cursor = searchParams.get("cursor");
  let cursorValue: number | undefined;

  if (cursor) {
    cursorValue = parseInt(cursor); // 커서를 숫자로 파싱
  }

  const postsQuery = await prisma.posts.findMany({
    where: {
      uuid: useruuid,
    },
    orderBy: {
      idx: "desc", // 최신순 정렬
    },
    include: {
      likes: true,
    },
    take: postsPerPage + 1, // 다음 페이지 여부 확인을 위해 +1
    ...(cursorValue && cursorValue > 1 // cursor가 1보다 큰 경우에만 적용
      ? {
          cursor: { idx: cursorValue }, // 커서 적용
          skip: 1, // 현재 커서를 제외
        }
      : {}),
  });

  console.log("postsQuery result:", postsQuery);
  // 총 게시글 수
  const totalPosts = await prisma.posts.count({
    where: {
      uuid: useruuid,
    },
  });

  // 커서 기반 페이지네이션
  const hasNextPage = postsQuery.length > postsPerPage;
  const slicedPosts = postsQuery.slice(0, postsPerPage);
  const formattedPosts = slicedPosts.map((post) => {
    console.log("zzzz", typeof post.reg_dt);
    return {
      idx: post.idx,
      isAuthor: true, // 모든 게시글은 현재 사용자가 작성
      username: post.username,
      title: post.title,
      content: post.content,
      language: post.language,
      like: post.like,
      comment: post.comment,
      reg_dt: post.reg_dt.toString(),
      initialLike: post.likes.some((user) => user.uuid === useruuid),
    };
  });

  const nextCursor = hasNextPage
    ? postsQuery[postsQuery.length - 1].idx.toString()
    : null;

  return NextResponse.json({
    data: formattedPosts,
    nextCursor,
    totalPosts,
    pageParams: cursor ? parseInt(cursor) : 1,
  });
}
