"use server";

import pool, { db } from "./db";
import { RowDataPacket } from "mysql2";
import {
  CommentsTypes,
  PostListProps,
  PostListResponse,
  PostTypes,
  User,
} from "./definitions";
import { LanguageType } from "../stores/types/language-store-type";

export const getUser = async (uuid: string): Promise<User[]> => {
  const query = `SELECT * FROM users WHERE uuid = ?`;
  const queryParams = [uuid];

  return db<User[]>({ query, queryParams });
};

export const getPost = async (id: string) => {
  const query = `SELECT * FROM posts WHERE idx = ?`;
  const queryParams = [id];

  return db<PostTypes[]>({ query, queryParams });
};

export const getComments = async ({ post_id }: { post_id: string }) => {
  const query = "SELECT * FROM posts WHERE post_id = ?";
  const queryParams = [post_id];
  return db<CommentsTypes[]>({ query, queryParams });
};

export const getPosts = async ({
  page,
  postsPerPage = 12,
  queryKey,
}: PostListProps): Promise<PostListResponse> => {
  const offset = (page - 1) * postsPerPage;
  try {
    // 총 게시물 수
    const [countRows] = await pool.query<RowDataPacket[]>(`
      SELECT COUNT(*) AS totalPosts FROM posts
    `);
    const totalPage = Math.ceil(countRows[0].totalPosts / postsPerPage);

    let query = `SELECT * FROM posts`;
    const queryParams: Array<string | number> = [offset, postsPerPage];

    if (queryKey !== "whole") {
      // language가 'while'일 경우 전체 조회
      query += ` WHERE language = ?`;
      queryParams.unshift(queryKey);
    }

    query += ` LIMIT ?, ?`;

    const [rows] = await pool.query<RowDataPacket[]>(query, queryParams);

    return {
      posts: rows as PostTypes[],
      totalPage,
      pageParams: page,
    };
  } catch (e) {
    console.error(e);
    throw new Error("Cannot connect to DB", e as Error);
  }
};
