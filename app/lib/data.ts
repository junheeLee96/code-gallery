// todo: 에러처리

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
}) => {
  const isoDate = date.toISOString();
  const encodedDate = encodeURIComponent(isoDate);
  const res = await fetch(
    `${URL}/api/getPosts?page=${page}&language=${queryKey}&date=${encodedDate}`
  );
  const data = await res.json();
  return data;
};

export const getComments = async ({
  page,
  queryKey,
  date,
}: {
  page: number;
  queryKey: string;
  date: Date;
}) => {
  const isoDate = date.toISOString();
  const encodedDate = encodeURIComponent(isoDate);
  const res = await fetch(
    `${URL}api/getComments?page=${page}&post_id=${queryKey}&date=${encodedDate}`
  );
  const data = await res.json();
  return data;
};

export const getPost = async (post_id: string) => {
  const res = await fetch(`${URL}/api/getPost/${post_id}`);
  const data = await res.json();
  return data;
};

// import moment from "moment-timezone";
// import { db } from "./db";
// import { RowDataPacket } from "mysql2";
// import {
//   CommentListResponse,
//   CommentsTypes,
//   InfiniteProps,
//   PostListResponse,
//   PostTypes,
//   User,
// } from "./definitions";
// import { auth } from "@/auth";

// export const getUser = async (uuid: string): Promise<User[]> => {
//   const query = `SELECT * FROM users WHERE uuid = ?`;
//   const queryParams = [uuid];

//   return db<User[]>({ query, queryParams });
// };

// export async function getPost(id: string): Promise<PostTypes[]> {
//   // todo: /posts/[id]의 메타데이터 때문에 캐싱고려

//   const query = `SELECT * FROM posts WHERE idx = ?`;
//   const queryParams = [id];
//   return db<PostTypes[]>({ query, queryParams });
// }

// export const getComments = async ({
//   page,
//   postsPerPage = 12,
//   queryKey,
//   date,
// }: InfiniteProps): Promise<CommentListResponse> => {
//   const offset = (page - 1) * postsPerPage;
//   const session = await auth();
//   const useruuid = session ? session.user.id : null;

//   const CommentCountsQuery = `SELECT COUNT(*) AS totalComments FROM comments WHERE post_id = ? and reg_dt < ?`;
//   const CommentQueryParams = [queryKey, date];
//   const [countRows] = await db<RowDataPacket[]>({
//     query: CommentCountsQuery,
//     queryParams: CommentQueryParams,
//   });
//   const { totalComments } = countRows;
//   const totalCommentPage = Math.ceil(totalComments / postsPerPage);

//   const query =
//     "SELECT * FROM comments WHERE post_id = ? and reg_dt < ? LIMIT ?, ?";
//   const queryParams = [queryKey, date, offset, postsPerPage];

//   const data = await db<(Omit<CommentsTypes, "isAuthor"> & { uuid: string })[]>(
//     {
//       query,
//       queryParams,
//     }
//   );

//   const comments: CommentsTypes[] = data.map(
//     ({ uuid, reg_dt, ...comment }) => ({
//       ...comment,
//       reg_dt: moment.utc(reg_dt).tz("Asia/Seoul").format(),
//       isAuthor: useruuid === uuid,
//     })
//   );

//   return {
//     comments,
//     totalPage: totalCommentPage,
//     pageParams: page,
//   };
// };

// export const getPosts = async ({
//   page,
//   postsPerPage = 12,
//   queryKey,
//   date,
// }: InfiniteProps): Promise<PostListResponse> => {
//   const session = await auth();
//   const useruuid = session ? session.user.id : null;
//   const offset = (page - 1) * postsPerPage;

//   // count
//   let PostCountQuery =
//     "SELECT COUNT(*) AS totalPosts FROM posts WHERE reg_dt < ?";
//   const PostCountQueryParams: Array<string | number | Date> = [date];

//   // get posts
//   let PostQuery = "SELECT * FROM posts WHERE reg_dt < ?";
//   const PostQueryParams: Array<string | number | Date> = [
//     date,
//     offset,
//     postsPerPage,
//   ];

//   if (queryKey !== "whole") {
//     const optionalQuery = " and language = ?";
//     PostCountQuery += optionalQuery;
//     PostCountQueryParams.push(queryKey);

//     PostQuery += optionalQuery;
//     // PostQueryParams.unshift(queryKey);
//     PostQueryParams.splice(1, 0, queryKey);
//   }
//   PostQuery += " ORDER BY reg_dt DESC LIMIT ?, ?";

//   const [countRows] = await db<[{ totalPosts: number }]>({
//     query: PostCountQuery,
//     queryParams: PostCountQueryParams,
//   });
//   const totalPage = Math.ceil(countRows.totalPosts / postsPerPage);

//   const postRows = await db<(Omit<PostTypes, "isAuthor"> & { uuid: string })[]>(
//     {
//       query: PostQuery,
//       queryParams: PostQueryParams,
//     }
//   );

//   const posts: PostTypes[] = postRows.map(({ uuid, ...post }) => ({
//     ...post,
//     isAuthor: useruuid === uuid,
//   }));

//   console.log("posts", posts);

//   return {
//     posts,
//     totalPage,
//     pageParams: page,
//   };
// };
