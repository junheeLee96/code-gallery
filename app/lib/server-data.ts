"use server";

import { auth } from "@/auth";
import { DetailedPostTypes } from "./definitions";
import { prisma } from "@/prisma";
import { notFound } from "next/navigation";

export const getUser = async () => {
  const session = await auth();
  if (!session?.user?.id || !session?.user?.id) {
    throw new Error("로그인이 필요합니다.");
  }
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  return user;
};
export async function getPost(post_id: string): Promise<DetailedPostTypes> {
  const session = await auth();
  const useruuid = session?.user?.id;

  const post = await prisma.posts.findUnique({
    where: { idx: parseInt(post_id) },
    include: {
      user: true, // 작성자 정보 포함
      likes: true, // 좋아요 데이터 포함
      comments: true, // 댓글 데이터 포함 (필요에 따라 추가 가능)
    },
  });
  if (!post) notFound();

  // formattedPost 생성
  const formattedPost: DetailedPostTypes = {
    idx: post.idx,
    username: post.username,
    title: post.title,
    content: post.content,
    language: post.language,
    like: post.like,
    comment: post.comment,
    reg_dt: post.reg_dt.toString(),
    initialLike: post.likes.some((like) => like.uuid === useruuid),
    isAuthor: post.user.id === useruuid, // 작성자 확인
    likes: post.likes.length, // 좋아요 수
    comments: post.comments.length, // 댓글 수
  };

  return formattedPost;
}
