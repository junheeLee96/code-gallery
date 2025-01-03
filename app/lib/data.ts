import { client } from "../api/client";
import { queryFnParams } from "../hooks/useInfiniteQueryHook";
import {
  CommentsTypes,
  InfiniteQueryResponse,
  PostTypes,
  User,
} from "./definitions";

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
}: queryFnParams): Promise<InfiniteQueryResponse<PostTypes[]>> => {
  const isoDate = date.toISOString();
  const encodedDate = encodeURIComponent(isoDate);
  return client<Promise<InfiniteQueryResponse<PostTypes[]>>>("/api/getPosts", {
    params: {
      cursor,
      language: queryKey,
      date: encodedDate,
      sorting,
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

export const getPost = async (post_id: string): Promise<PostTypes[]> => {
  return client<PostTypes[]>(`/api/getPost`, {
    params: {
      post_id,
    },
  });
};
