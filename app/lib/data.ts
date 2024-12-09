"use server";

import pool from "./db";
import { RowDataPacket } from "mysql2";
import { User } from "./definitions";

export const getUser = async (uuid: string): Promise<User | null> => {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM users WHERE uuid = ?`,
      [uuid]
    );

    if (rows.length > 0) {
      const user: User = {
        uuid: rows[0].uuid,
        user_name: rows[0].user_name,
        email: rows[0].email,
        image: rows[0].image,
      };
      return user;
    }
    return null;
  } catch (err) {
    console.log(err);
    throw new Error("Cannot connect to db");
  }
};
