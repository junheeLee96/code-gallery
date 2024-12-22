import { db } from "@/app/lib/db";
import { CommentsTypes } from "@/app/lib/definitions";
import { auth } from "@/auth";
import moment from "moment-timezone";
import { RowDataPacket } from "mysql2";
import { NextResponse } from "next/server";

const postsPerPage = 12;

export async function GET(request: Request) {
  const session = await auth();
  const useruuid = session?.user?.id;

  const { searchParams } = new URL(request.url);
  const dateString = searchParams.get("date");
  const date = dateString
    ? new Date(decodeURIComponent(dateString))
    : new Date();

  const page = Number(searchParams.get("page"));
  const post_id = searchParams.get("post_id") as string;
  const offset = (page - 1) * postsPerPage;

  const commentCountsQuery = `SELECT COUNT(*) AS totalComments FROM comments WHERE post_id = ? and reg_dt < ?`;
  const commentQueryParams: Array<string | Date> = [post_id, date];

  const [countRows] = await db<RowDataPacket[]>({
    query: commentCountsQuery,
    queryParams: commentQueryParams,
  });
  const { totalComments } = countRows;
  const totalCommentPage = Math.ceil(totalComments / postsPerPage);

  const query =
    "SELECT * FROM comments WHERE post_id = ? and reg_dt < ? LIMIT ?, ?";
  const queryParams = [post_id, date, offset, postsPerPage];

  const data = await db<(Omit<CommentsTypes, "isAuthor"> & { uuid: string })[]>(
    {
      query,
      queryParams,
    }
  );

  const comments: CommentsTypes[] = data.map(
    ({ uuid, reg_dt, ...comment }) => ({
      ...comment,
      reg_dt: moment.utc(reg_dt).tz("Asia/Seoul").format(),
      isAuthor: useruuid === uuid,
    })
  );

  return NextResponse.json({
    comments,
    totalPage: totalCommentPage,
    pageParams: page,
  });
}
