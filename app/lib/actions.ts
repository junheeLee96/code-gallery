"use server";

import { auth } from "@/auth";
import pool from "./db";
import { User } from "./definitions";
import { FormEvent } from "react";
import { getUser } from "./data";
import { redirect } from "next/navigation";

export async function createNewUser(user: User) {
  const query = `
        INSERT INTO users (uuid, user_name,nickname, email, image,reg_dt)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

  // `pool.query`에 쿼리와 파라미터를 전달합니다.
  const reg_dt = new Date();
  const values = [
    user.uuid,
    user.user_name,
    user.nickname,
    user.email,
    user.image,
    reg_dt,
  ];

  try {
    await pool.query(query, values);
    return { message: "complete insert new user" };
  } catch (err) {
    console.error("Error inserting new user:", err);
    throw new Error("Cannot insert new user into the database");
  }
}

export async function createPost(FormData: FormData) {
  const session = await auth();
  console.log(session);
  const uuid = session?.user?.id;

  if (!uuid) {
    throw new Error("로그인 필");
  }
  const nickname = session.user.nickname;
  const language = FormData.get("language");

  const content = FormData.get("markdownContent");

  const query = `
        INSERT INTO posts (uuid, nickname, content, language)
        VALUES (?, ?, ?, ?)
    `;

  const values = [uuid, nickname, content, language];
  try {
    await pool.query(query, values);
    // return { message: "complete insert new post" };
  } catch (e) {
    console.error(e);
    throw new Error("Cannot insert new Post", e as Error);
  }
  redirect("/");
}
