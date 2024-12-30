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

  const postIdArray = postRows.map((post) => post.idx);
  const likesObject = await isLike(postIdArray, useruuid as string);

  const posts: PostTypes[] = postRows.map(({ uuid, ...post }) => ({
    ...post,
    initialLike: likesObject[post.idx],
    isAuthor: useruuid === uuid,
  }));

  return NextResponse.json({
    posts,
    totalPage,
    pageParams: page,
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
      console.log("response_arr = ", response_arr);
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
