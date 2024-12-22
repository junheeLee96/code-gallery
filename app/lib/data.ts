// todo: 에러처리

import { client } from "../api/client";
import { CommentsTypes, PostTypes } from "./definitions";

const URL = process.env.NEXT_PUBLIC_API_URL;

export const getUser = async (uuid: string) => {
  const res = await fetch(`${URL}/api/getUser?uuid=${uuid}`);
  const data = await res.json();
  return data;
};

export const getPosts = async ({
  page,
  queryKey,
  date,
}: {
  page: number;
  queryKey: string;
  date: Date;
}): Promise<PostTypes[]> => {
  const isoDate = date.toISOString();
  const encodedDate = encodeURIComponent(isoDate);
  return client<PostTypes[]>("/api/getPosts", {
    params: {
      page: String(page),
      language: queryKey,
      date: encodedDate,
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
}): Promise<CommentsTypes[]> => {
  const isoDate = date.toISOString();
  const encodedDate = encodeURIComponent(isoDate);
  return client<CommentsTypes[]>("/api/getComments", {
    params: {
      page: String(page),
      post_id: queryKey,
      date: encodedDate,
    },
  });
  // const res = await fetch(
  //   `${URL}api/getComments?page=${page}&post_id=${queryKey}&date=${encodedDate}`
  // );
  // const data = await res.json();
  // return data;
};

export const getPost = async (post_id: string): Promise<PostTypes[]> => {
  return client<PostTypes[]>(`/api/getPost/${post_id}`);
};
