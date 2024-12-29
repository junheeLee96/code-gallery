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
  const commentCountQuery =
    "UPDATE posts SET comment = comment + 1 WHERE idx = ?;";
  db<ResultSetHeader[]>({
    query: commentCountQuery,
    queryParams: [queryParams[0]],
  });
  return db<ResultSetHeader[]>({ query, queryParams });
};

export const createLike = async (
  post_id: string
): Promise<ResultSetHeader[] | { message: string }> => {
  const session = await auth();
  const uuid = session?.user?.id;
  if (!uuid) return { message: "로그인이 필요합니다. 로그인하시겠습니까?" };

  const likeQuery = `UPDATE posts SET \`like\` = \`like\` + 1 WHERE idx = ?;`;
  const likeParams = [post_id];

  const query = "INSERT INTO likes (uuid, post_id) VALUES (?, ?);";
  const queryParams = [uuid, post_id];
  await db<ResultSetHeader[]>({ query: likeQuery, queryParams: likeParams });
  return db<ResultSetHeader[]>({ query, queryParams });
};
