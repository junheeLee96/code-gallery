import { db } from "@/app/lib/db";
import { CommentsTypes, InfiniteQueryResponse } from "@/app/lib/definitions";
import { auth } from "@/auth";
import moment from "moment-timezone";
import { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";

const commentsPerPage = 12;

export async function GET(
  request: Request
): Promise<NextResponse<InfiniteQueryResponse<CommentsTypes[]>>> {
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
  const commentCountsQuery = `SELECT COUNT(*) AS totalComments FROM comments WHERE post_id = ? and reg_dt < ?`;
  const commentQueryParams: Array<string | Date> = [post_id, date];

  const [countRows] = await db<RowDataPacket[]>({
    query: commentCountsQuery,
    queryParams: commentQueryParams,
  });
  console.log("countRows = ", countRows);
  const { totalComments } = countRows;
  const totalCommentPage = Math.ceil(totalComments / commentsPerPage);

  // Get comments
  let commentQuery = `
    SELECT * FROM comments 
    WHERE post_id = ? and reg_dt < ?
  `;
  const queryParams: Array<string | Date | number> = [post_id, date];

  // Cursor based pagination
  if (cursorValue !== undefined && cursorDate !== undefined) {
    commentQuery += " AND (reg_dt < ? OR (reg_dt = ? AND idx < ?))";
    queryParams.push(cursorDate, cursorDate, cursorValue);
  }

  commentQuery += " ORDER BY reg_dt DESC, idx DESC LIMIT ?";
  queryParams.push(commentsPerPage + 1);

  const data = await db<(Omit<CommentsTypes, "isAuthor"> & { uuid: string })[]>(
    {
      query: commentQuery,
      queryParams,
    }
  );

  const hasNextPage = data.length > commentsPerPage;
  const comments = data.slice(0, commentsPerPage);

  const formattedComments: CommentsTypes[] = comments.map(
    ({ uuid, reg_dt, ...comment }) => ({
      ...comment,
      reg_dt: moment.utc(reg_dt).tz("Asia/Seoul").format(),
      isAuthor: useruuid === uuid,
    })
  );

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
