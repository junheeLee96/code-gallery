import { db } from "@/app/lib/db";
import { InfiniteQueryResponse, PostTypes } from "@/app/lib/definitions";
import { auth } from "@/auth";
import { ResultSetHeader } from "mysql2";
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
  const date = dateString
    ? new Date(decodeURIComponent(dateString))
    : new Date();

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

  // count
  let PostCountQuery =
    "SELECT COUNT(*) AS totalPosts FROM posts WHERE reg_dt <= ?";
  const PostCountQueryParams: Array<string | number | Date> = [date];

  // get posts
  let PostQuery = `
    SELECT p.*, COALESCE(l.like_count, 0) as like_count 
    FROM posts p 
    LEFT JOIN (
      SELECT post_id, COUNT(*) as like_count 
      FROM likes 
      GROUP BY post_id
    ) l ON p.idx = l.post_id 
    WHERE p.reg_dt <= ?
  `;
  const PostQueryParams: Array<string | number | Date> = [date];

  if (language !== "whole") {
    const optionalQuery = " AND p.language = ?";
    PostCountQuery += optionalQuery;
    PostCountQueryParams.push(language);
    PostQuery += optionalQuery;
    PostQueryParams.push(language);
  }

  // 커서 기반 페이지네이션 처리
  if (cursorValue !== undefined && cursorDate !== undefined) {
    switch (sorting) {
      case "old":
        PostQuery += " AND (p.reg_dt > ? OR (p.reg_dt = ? AND p.idx > ?))";
        PostQueryParams.push(cursorDate, cursorDate, cursorValue);
        break;
      case "recent":
        PostQuery += " AND (p.reg_dt < ? OR (p.reg_dt = ? AND p.idx < ?))";
        PostQueryParams.push(cursorDate, cursorDate, cursorValue);
        break;
      case "like":
        PostQuery +=
          " AND (COALESCE(l.like_count, 0) < ? OR (COALESCE(l.like_count, 0) = ? AND p.idx > ?))";
        PostQueryParams.push(cursorValue, cursorValue, cursorValue);
        break;
      case "least_likes":
        PostQuery +=
          " AND (COALESCE(l.like_count, 0) > ? OR (COALESCE(l.like_count, 0) = ? AND p.idx > ?))";
        PostQueryParams.push(cursorValue, cursorValue, cursorValue);
        break;
    }
  }

  // 정렬 처리
  switch (sorting) {
    case "old":
      PostQuery += " ORDER BY p.reg_dt ASC, p.idx ASC";
      break;
    case "recent":
      PostQuery += " ORDER BY p.reg_dt DESC, p.idx DESC";
      break;
    case "like":
      PostQuery +=
        " ORDER BY COALESCE(l.like_count, 0) DESC, p.reg_dt DESC, p.idx DESC";
      break;
    case "least_likes":
      PostQuery +=
        " ORDER BY COALESCE(l.like_count, 0) ASC, p.reg_dt ASC, p.idx ASC";
      break;
    default:
      PostQuery += " ORDER BY p.reg_dt DESC, p.idx DESC";
  }

  PostQuery += " LIMIT ?";
  PostQueryParams.push(postsPerPage + 1);

  console.log("Final PostQuery:", PostQuery);
  console.log("Final PostQueryParams:", PostQueryParams);

  const [countRows] = await db<[{ totalPosts: number }]>({
    query: PostCountQuery,
    queryParams: PostCountQueryParams,
  });

  const postRows = await db<
    (Omit<PostTypes, "isAuthor" | "initialLike"> & {
      uuid: string;
      like_count: number;
    })[]
  >({
    query: PostQuery,
    queryParams: PostQueryParams,
  });

  console.log("Query results:", postRows);

  const hasNextPage = postRows.length > postsPerPage;
  const posts = postRows.slice(0, postsPerPage);

  const postIdArray = posts.map((post) => post.idx);

  const likesObject = await isLike(postIdArray, useruuid as string);

  const formattedPosts: PostTypes[] = posts.map(
    ({ uuid, like_count, ...post }) => ({
      ...post,
      isAuthor: useruuid === uuid,
      initialLike: likesObject[post.idx],
      like: like_count,
    })
  );

  const nextCursor = hasNextPage
    ? `${posts[posts.length - 1].idx}_${new Date(
        posts[posts.length - 1].reg_dt
      ).getTime()}`
    : null;

  return NextResponse.json({
    posts: formattedPosts,
    nextCursor,
    totalPosts: countRows.totalPosts,
    pageParams: cursor ? parseInt(cursor.split("_")[0]) : 1,
  });
}

async function isLike(
  postIdArray: number[],
  uuid: string
): Promise<{ [key: number]: boolean }> {
  const likesObject: { [key: number]: boolean } = {};
  const promise_arr = postIdArray.map((post_id) => {
    const query = "SELECT * FROM likes WHERE post_id = ? AND uuid = ? ;";
    const queryParams = [post_id, uuid];
    return db<ResultSetHeader[]>({ query, queryParams }).then((response) => ({
      post_id,
      response,
    }));
  });

  return Promise.all(promise_arr)
    .then((response_arr) => {
      response_arr.forEach(({ post_id, response }) => {
        likesObject[post_id] = response.length > 0;
      });
      return likesObject;
    })
    .catch((error) => {
      console.log(error);
      return likesObject;
    });
}
