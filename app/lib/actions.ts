"use server";

import { auth } from "@/auth";
import { db } from "./db";
import { createCommentProps, createPostProps, User } from "./definitions";
import { redirect } from "next/navigation";
import { ResultSetHeader } from "mysql2";

export async function createNewUser(user: User) {
  if (!user || !user.uuid || !user.nickname) {
    throw new Error("User is not logged");
  }

  const query = `
        INSERT INTO users (uuid, user_name,nickname, email, image,reg_dt)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

  const reg_dt = new Date();
  const queryParams = [
    user.uuid,
    user.user_name,
    user.nickname,
    user.email,
    user.image,
    reg_dt,
  ];
  await db<ResultSetHeader>({ query, queryParams });
}

export async function createPost({ content, language }: createPostProps) {
  const session = await auth();
  console.log(session);
  const uuid = session?.user?.id;

  if (!uuid) {
    throw new Error("로그인이 필요합니다.");
  }
  const nickname = session.user.nickname;

  const query = `
        INSERT INTO posts (uuid, nickname, content, language)
        VALUES (?, ?, ?, ?)
    `;

  const queryParams = [uuid, nickname, content, language];
  await db<ResultSetHeader>({ query, queryParams });
  // try {
  //   await pool.query(query, values);
  //   // return { message: "complete insert new post" };
  // } catch (e) {
  //   console.error(e);
  //   throw new Error("Cannot insert new Post", e as Error);
  // }
  redirect("/");
}

export const createComment = async ({
  comment,
  post_id,
  uuid,
  nickname,
}: createCommentProps) => {
  const query = `INSERT INTO comments (post_id, uuid, nickname, comment)
        VALUES (?, ?, ?, ?)`;
  const queryParams = [post_id, uuid, nickname, comment];
  return db<ResultSetHeader[]>({ query, queryParams });
};
