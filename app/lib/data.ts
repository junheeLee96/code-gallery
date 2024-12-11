"use server";

import pool from "./db";
import { RowDataPacket } from "mysql2";
import { PostTypes, User } from "./definitions";

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

export const getPosts = async () => {};
