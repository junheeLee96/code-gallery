import { client } from "../api/client";
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
}: {
  cursor: string;
  queryKey: string;
  date: Date;
  sorting: string;
}): Promise<InfiniteQueryResponse<PostTypes[]>> => {
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
  page,
  queryKey,
  date,
}: {
  page: number;
  queryKey: string;
  date: Date;
}): Promise<InfiniteQueryResponse<CommentsTypes[]>> => {
  const isoDate = date.toISOString();
  const encodedDate = encodeURIComponent(isoDate);
  return client<Promise<InfiniteQueryResponse<CommentsTypes[]>>>(
    "/api/getComments",
    {
      params: {
        page: String(page),
        post_id: queryKey,
        date: encodedDate,
      },
    }
  );
};

export const getPost = async (post_id: string): Promise<PostTypes[]> => {
  return client<PostTypes[]>(`/api/getPost/${post_id}`);
};
