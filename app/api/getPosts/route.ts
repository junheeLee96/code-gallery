import { db } from "@/app/lib/db";
import { InfiniteQueryResponse, PostTypes } from "@/app/lib/definitions";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

const postsPerPage = 12;
export async function GET(
  request: Request
): Promise<NextResponse<InfiniteQueryResponse<PostTypes[]>>> {
  const { searchParams } = new URL(request.url);
  const session = await auth();
  const useruuid = session?.user?.id;
  const page = Number(searchParams.get("page"));
  const language = searchParams.get("language") as string;
  const dateString = searchParams.get("date");
  const date = dateString
    ? new Date(decodeURIComponent(dateString))
    : new Date();
  const offset = (page - 1) * postsPerPage;

  // count
  let PostCountQuery =
    "SELECT COUNT(*) AS totalPosts FROM posts WHERE reg_dt < ?";
  const PostCountQueryParams: Array<string | number | Date> = [date];

  // get posts
  let PostQuery = "SELECT * FROM posts WHERE reg_dt < ?";
  const PostQueryParams: Array<string | number | Date> = [
    date,
    offset,
    postsPerPage,
  ];

  if (language !== "whole") {
    const optionalQuery = " and language = ?";
    PostCountQuery += optionalQuery;
    PostCountQueryParams.push(language);

    PostQuery += optionalQuery;
    PostQueryParams.splice(1, 0, language);
  }
  PostQuery += " ORDER BY reg_dt DESC LIMIT ?, ?";

  const [countRows] = await db<[{ totalPosts: number }]>({
    query: PostCountQuery,
    queryParams: PostCountQueryParams,
  });
  const totalPage = Math.ceil(countRows.totalPosts / postsPerPage);

  const postRows = await db<(Omit<PostTypes, "isAuthor"> & { uuid: string })[]>(
    {
      query: PostQuery,
      queryParams: PostQueryParams,
    }
  );

  const posts: PostTypes[] = postRows.map(({ uuid, ...post }) => ({
    ...post,
    isAuthor: useruuid === uuid,
  }));

  return NextResponse.json({
    posts,
    totalPage,
    pageParams: page,
  });
}
