"use server";

import pool from "./db";
import { RowDataPacket } from "mysql2";
import {
  PostListProps,
  PostListResponse,
  PostTypes,
  User,
} from "./definitions";
import { LanguageType } from "../stores/types/language-store-type";

export const getUser = async (uuid: string): Promise<User | null> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM users WHERE uuid = ?`,
      [uuid]
    );

    if (rows.length > 0) {
      return rows[0] as User;
    }
    return null;
  } catch (err) {
    console.log(err);
    throw new Error("Cannot connect to db");
  }
};

export const getPost = async (id: string) => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM posts WHERE idx = ?`,
      [id]
    );
    if (rows.length > 0) {
      return rows[0] as PostTypes;
    }
    return null;
  } catch (e) {
    console.error(e as Error);
    throw new Error("Cannot get post");
  }
};

export const getPosts = async ({
  page,
  postsPerPage = 12,
  queryKey,
}: PostListProps): Promise<PostListResponse> => {
  const offset = (page - 1) * postsPerPage;

  try {
    // 총 게시물 수를 가져오는 쿼리
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

    // 수정된 쿼리 실행
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
