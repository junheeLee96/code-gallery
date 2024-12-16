"use server";

import { db } from "./db";
import { RowDataPacket } from "mysql2";
import {
  CommentListResponse,
  CommentsTypes,
  InfiniteProps,
  PostListResponse,
  PostTypes,
  User,
} from "./definitions";
import { auth } from "@/auth";
import { cache } from "react";

export const getUser = async (uuid: string): Promise<User[]> => {
  const query = `SELECT * FROM users WHERE uuid = ?`;
  const queryParams = [uuid];

  return db<User[]>({ query, queryParams });
};

export const getPost = async (id: string): Promise<PostTypes[]> => {
  // todo: /posts/[id]의 메타데이터 때문에 캐싱고려

  const query = `SELECT * FROM posts WHERE idx = ?`;
  const queryParams = [id];

  return await db<PostTypes[]>({ query, queryParams });
};

export const getComments = async ({
  page,
  postsPerPage = 12,
  queryKey,
}: InfiniteProps): Promise<CommentListResponse> => {
  const offset = (page - 1) * postsPerPage;
  const session = await auth();
  const useruuid = session ? session.user.id : null;

  const CommentCountsQuery = `SELECT COUNT(*) AS totalComments FROM comments WHERE post_id = ?`;
  const CommentQueryParams = [queryKey];
  const [countRows] = await db<RowDataPacket[]>({
    query: CommentCountsQuery,
    queryParams: CommentQueryParams,
  });
  const { totalComments } = countRows;
  const totalCommentPage = Math.ceil(totalComments / postsPerPage);

  const query = "SELECT * FROM comments WHERE post_id = ? LIMIT ?, ?";
  const queryParams = [queryKey, offset, postsPerPage];

  const data = await db<(Omit<CommentsTypes, "isAuthor"> & { uuid: string })[]>(
    {
      query,
      queryParams,
    }
  );

  const comments: CommentsTypes[] = data.map(({ uuid, ...comment }) => ({
    ...comment,
    isAuthor: useruuid === uuid,
  }));
  return {
    comments,
    totalPage: totalCommentPage,
    pageParams: page,
  };
};

export const getPosts = async ({
  page,
  postsPerPage = 12,
  queryKey,
}: InfiniteProps): Promise<PostListResponse> => {
  const session = await auth();
  const useruuid = session ? session.user.id : null;
  const offset = (page - 1) * postsPerPage;

  // count
  let PostCountQuery = "SELECT COUNT(*) AS totalPosts FROM posts";
  const PostCountQueryParams = [];

  // get posts
  let PostQuery = "SELECT * FROM posts";
  const PostQueryParams: Array<string | number> = [offset, postsPerPage];

  if (queryKey !== "whole") {
    const optionalQuery = " WHERE language = ?";
    PostCountQuery += optionalQuery;
    PostCountQueryParams.push(queryKey);

    PostQuery += optionalQuery;
    PostQueryParams.unshift(queryKey);
  }
  PostQuery += " LIMIT ?, ?";

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

  console.log("rows", posts);

  return {
    posts,
    totalPage,
    pageParams: page,
  };
};
