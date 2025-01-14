"use server";

import { auth } from "@/auth";
import { db } from "./db";
import {
  createCommentProps,
  PostActionsProps,
  PostTypes,
  User,
} from "./definitions";
import { ResultSetHeader } from "mysql2";

async function checkAuthor({
  post_id,
  uuid,
}: {
  post_id: string;
  uuid: string | undefined;
}) {
  const UserQuery = "SELECT * FROM posts WHERE idx = ?";
  const UserQueryParams = [post_id];
  const [author] = await db<User[]>(UserQuery, UserQueryParams);
  if (author.uuid === uuid) return true;

  return false;
}

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
  await db<ResultSetHeader>(query, queryParams);
}

export async function createPost({
  title,
  content,
  language,
}: PostActionsProps) {
  const session = await auth();
  const uuid = session?.user?.id;

  if (!uuid) {
    throw new Error("로그인이 필요합니다.");
  }
  const nickname = session.user.nickname as string;

  const query = `
        INSERT INTO posts (uuid, nickname, title,content, language)
        VALUES (?, ?, ?, ?, ?)
    `;

  const queryParams = [uuid, nickname, title, content, language];
  await db<ResultSetHeader>(query, queryParams);
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
  db<ResultSetHeader[]>(commentCountQuery, [queryParams[0]]);
  return db<ResultSetHeader[]>(query, queryParams);
};
export const createLike = async (
  post_id: string,
  isLike: boolean
): Promise<ResultSetHeader[] | { message: string }> => {
  const session = await auth();
  const uuid = session?.user?.id;
  if (!uuid) return { message: "로그인이 필요합니다. 로그인하시겠습니까?" };

  const likeQuery = isLike
    ? `UPDATE posts SET \`like\` = \`like\` + 1 WHERE idx = ?;`
    : "UPDATE posts SET `like` = `like` - 1 WHERE idx = ?;";
  const likeParams = [post_id];

  const query = isLike
    ? "INSERT INTO likes (uuid, post_id) VALUES (?, ?);"
    : "DELETE FROM likes WHERE uuid = ? AND post_id = ?  ;";
  const queryParams = [uuid, post_id];
  await db<ResultSetHeader[]>(likeQuery, likeParams);
  return db<ResultSetHeader[]>(query, queryParams);
};

export const deletePost = async (post_id: string) => {
  try {
    const session = await auth();
    const useruuid = session?.user?.id;
    const author = await checkAuthor({ post_id, uuid: useruuid });

    // author가 아니라면 403 반환
    if (!author) {
      return {
        message: "권한이 없습니다.",
      };
    }

    const deleteQuery = "DELETE FROM posts WHERE idx = ?";
    const deleteQueryParams = [post_id];

    await db(deleteQuery, deleteQueryParams);

    return { message: "Delete successfully" };
  } catch (error) {
    console.error("Error processing request:", error);
    throw new Error("An unknown error occurred");
  }
};

export const editPost = async ({
  title,
  content,
  language,
  post_id,
}: PostActionsProps & { post_id: string }) => {
  try {
    const session = await auth();
    const useruuid = session?.user?.id;
    const author = await checkAuthor({
      post_id,
      uuid: useruuid ? useruuid : "",
    });

    if (!author) {
      return {
        message: "권한이 없습니다.",
      };
    }

    const checkPostExistQuery = "SELECT * FROM posts WHERE idx = ?";
    const checkPostExistQueryParams = [post_id];

    const [post] = await db<PostTypes[]>(
      checkPostExistQuery,
      checkPostExistQueryParams
    );
    if (!post) return { message: "" };

    const updateQuery = `UPDATE posts SET 
    title = ? , 
    content = ? , 
    language = ? WHERE idx = ?;
`;
    const updateQueryParams = [title, content, language, post_id];

    await db<ResultSetHeader>(updateQuery, updateQueryParams);

    return { message: "update success" };
  } catch (error) {
    console.error("Error processing request:", error);
    throw new Error("An unknown error occurred");
  }
};
