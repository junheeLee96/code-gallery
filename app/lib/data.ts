import { ResultSetHeader } from "mysql2";
import { client } from "../api/client";
import { queryFnParams } from "../hooks/useInfiniteQueryHook";
import {
  CommentsTypes,
  InfiniteQueryResponse,
  PostTypes,
  User,
} from "./definitions";
import { auth } from "@/auth";
import { db } from "./db";

export const getUser = async (uuid: string) => {
  return client<User>(`/api/getUser`, {
    params: {
      uuid,
    },
  });
};
export const getPosts = async ({
  cursor,
  queryKey,
  date,
  sorting,
  timePeriod,
}: queryFnParams): Promise<InfiniteQueryResponse<PostTypes[]>> => {
  const isoDate = date.toISOString();
  const encodedDate = encodeURIComponent(isoDate);
  return client<Promise<InfiniteQueryResponse<PostTypes[]>>>("/api/getPosts", {
    params: {
      cursor,
      language: queryKey,
      date: encodedDate,
      sorting,
      timePeriod,
    },
  });
};

export const getComments = async ({
  cursor,
  queryKey,
  date,
}: {
  cursor: string;
  queryKey: string;
  date: Date;
}): Promise<InfiniteQueryResponse<CommentsTypes[]>> => {
  const isoDate = date.toISOString();
  const encodedDate = encodeURIComponent(isoDate);
  return client<Promise<InfiniteQueryResponse<CommentsTypes[]>>>(
    "/api/getComments",
    {
      params: {
        cursor,
        post_id: queryKey,
        date: encodedDate,
      },
    }
  );
};

// post의 유저와 session의 유저가 일치하는지
async function isLike(
  post_id: string,
  uuid: string | undefined
): Promise<boolean> {
  if (!uuid) return false;

  const query = "SELECT * FROM likes WHERE post_id = ? AND uuid = ? ;";
  const queryParams = [post_id, uuid];
  const likeData = await db<ResultSetHeader[]>({ query, queryParams });
  if (likeData.length > 0) return true;
  return false;
}
export async function getPost(post_id: string): Promise<null | PostTypes[]> {
  const query = `SELECT * FROM posts WHERE idx = ?`;
  const session = await auth();
  const useruuid = session?.user?.id;
  console.log("session = ", session);
  const queryParams = [post_id];
  const data = await db<(PostTypes & { uuid: string })[]>({
    query,
    queryParams,
  });

  if (!data || data.length === 0) return null;

  const initialLike = await isLike(post_id, useruuid);
  const fommattingData = data.map(({ uuid, ...post }) => ({
    ...post,
    initialLike,
    isAuthor: useruuid === uuid,
  }));
  return fommattingData;
}
