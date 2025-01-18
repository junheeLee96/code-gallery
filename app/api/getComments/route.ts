import { auth } from "@/auth";
import { prisma } from "@/prisma";
import moment from "moment-timezone";
import { NextResponse } from "next/server";

const commentsPerPage = 12;

export async function GET(request: Request): Promise<NextResponse> {
  const session = await auth();
  const useruuid = session?.user?.id;

  const { searchParams } = new URL(request.url);
  const dateString = searchParams.get("date");
  const date = dateString
    ? new Date(decodeURIComponent(dateString))
    : new Date();
  const cursor = searchParams.get("cursor");
  const post_id = searchParams.get("post_id") as string;

  // Parse cursor
  let cursorValue: number | undefined;
  let cursorDate: Date | undefined;
  if (cursor) {
    const [valueStr, dateStr] = cursor.split("_");
    cursorValue = parseInt(valueStr);
    const parsedDate = new Date(parseInt(dateStr));
    if (!isNaN(parsedDate.getTime())) {
      cursorDate = parsedDate;
    }
  }

  // Count comments
  const commentCounts = await prisma.comment.count({
    where: {
      post_id: parseInt(post_id),
      reg_dt: {
        lt: date,
      },
    },
  });
  const totalComments = commentCounts;
  const totalCommentPage = Math.ceil(totalComments / commentsPerPage);

  // Get comments
  const commentsData = await prisma.comment.findMany({
    where: {
      post_id: parseInt(post_id),
      reg_dt: {
        lt: date,
      },
    },
    orderBy: [{ reg_dt: "desc" }, { idx: "desc" }],
    take: commentsPerPage + 1,
    ...(cursorValue !== undefined &&
      cursorDate !== undefined && {
        skip: 0, // Start from the correct position based on cursor
        where: {
          AND: [
            { reg_dt: { lt: cursorDate } },
            { reg_dt: { equals: cursorDate }, idx: { lt: cursorValue } },
          ],
        },
      }),
  });

  const hasNextPage = commentsData.length > commentsPerPage;
  const comments = commentsData.slice(0, commentsPerPage);

  const formattedComments = comments.map(({ uuid, reg_dt, ...comment }) => ({
    ...comment,
    reg_dt: moment.utc(reg_dt).tz("Asia/Seoul").format(),
    isAuthor: useruuid === uuid,
  }));

  const nextCursor = hasNextPage
    ? `${comments[comments.length - 1].idx}_${new Date(
        comments[comments.length - 1].reg_dt
      ).getTime()}`
    : null;

  return NextResponse.json({
    data: formattedComments,
    nextCursor,
    totalPosts: totalCommentPage,
    pageParams: cursor ? parseInt(cursor.split("_")[0]) : 1,
  });
}
