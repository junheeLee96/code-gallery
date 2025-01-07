import { client } from "../api/client";
import { queryFnParams } from "../hooks/useInfiniteQueryHook";
import { CommentsTypes, InfiniteQueryResponse, PostTypes } from "./definitions";

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
