import { InfiniteQueryResponse, PostTypes } from "@/app/lib/definitions";
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

const postsPerPage = 12;

export async function GET(
  request: Request
): Promise<NextResponse<InfiniteQueryResponse<PostTypes[]>>> {
  const { searchParams } = new URL(request.url);
  const session = await auth();
  const useruuid = session?.user?.id;
  const cursor = searchParams.get("cursor");
  const sorting = searchParams.get("sorting") || "recent";
  const language = searchParams.get("language") as string;
  const dateString = searchParams.get("date");
  const timePeriod = searchParams.get("timePeriod");
  const date = dateString
    ? new Date(decodeURIComponent(dateString))
    : new Date();
  let startDate = new Date(date);

  switch (timePeriod) {
    case "day":
      startDate.setDate(date.getDate() - 1);
      break;
    case "week":
      startDate.setDate(date.getDate() - 7);
      break;
    case "month":
      startDate.setMonth(date.getMonth() - 1);
      break;
    case "year":
      startDate.setFullYear(date.getFullYear() - 1);
      break;
    case "whole":
    default:
      startDate = new Date(0); // 전체 기간에 대해 검색
      break;
  }

  // Parse cursor
  let cursorValue: number | undefined;
  let cursorDate: Date | undefined;
  let cursorLikes: number | undefined;
  if (cursor) {
    const [valueStr, dateStr, likesStr] = cursor.split("_");
    cursorValue = parseInt(valueStr);
    const parsedDate = new Date(parseInt(dateStr));
    if (!isNaN(parsedDate.getTime())) {
      cursorDate = parsedDate;
    }
    cursorLikes = parseInt(likesStr);
  }

  // 게시글 조회 쿼리
  const postsQuery = prisma.posts.findMany({
    where: {
      reg_dt: {
        gte: startDate,
        lte: date,
      },
      ...(language !== "whole" && { language }),
    },
    orderBy: (() => {
      switch (sorting) {
        case "old":
          return [{ reg_dt: "asc" }, { idx: "asc" }];
        case "recent":
          return [{ reg_dt: "desc" }, { idx: "desc" }];
        case "like":
          return [
            { likes: { _count: "desc" } },
            { reg_dt: "desc" },
            { idx: "desc" },
          ];
        case "least_likes":
          return [
            { likes: { _count: "asc" } },
            { reg_dt: "desc" },
            { idx: "asc" },
          ];
        default:
          return [{ reg_dt: "desc" }, { idx: "desc" }];
      }
    })(),
    take: postsPerPage + 1, // 다음 페이지 여부 확인을 위해 +1
    include: {
      likes: true,
    },
    ...(cursorValue &&
      cursorDate &&
      cursorLikes && {
        cursor: { idx: cursorValue },
        skip: 1,
      }),
  });

  // 총 게시글 수
  const totalPosts = await prisma.posts.count({
    where: {
      reg_dt: {
        gte: startDate,
        lte: date,
      },
      ...(language !== "whole" && { language }),
    },
  });

  // 쿼리 실행
  const posts = await postsQuery;

  // 커서 기반 페이지네이션
  const hasNextPage = posts.length > postsPerPage;
  const slicedPost = posts.slice(0, postsPerPage);
  const formattedPosts = slicedPost.map((post) => ({
    idx: post.idx,
    isAuthor: post.uuid === useruuid,
    username: post.username,
    title: post.title,
    content: post.content,
    language: post.language,
    like: post.like,
    comment: post.comment,
    reg_dt: post.reg_dt,
    initialLike: post.likes.some((user) => user.uuid === useruuid),
  }));

  const nextCursor = hasNextPage
    ? `${posts[posts.length - 1].idx}_${new Date(
        posts[posts.length - 1].reg_dt
      ).getTime()}_${posts[posts.length - 1].likes.length}`
    : null;

  return NextResponse.json({
    data: formattedPosts,
    nextCursor,
    totalPosts,
    pageParams: cursor ? parseInt(cursor.split("_")[0]) : 1,
  });
}
