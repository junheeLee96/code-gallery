"use server";

import { auth } from "@/auth";
import { createCommentProps, PostActionsProps } from "./definitions";

export async function createNewUser(newNickname: string) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("로그인이 필요합니다.");
  }
  if (!newNickname) {
    throw new Error("유효하지 않은 사용자 ID 또는 닉네임입니다.");
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { name: true, username: true },
    });
    if (!user || !user.name) {
      throw new Error("사용자 정보를 찾을 수 없습니다.");
    }
    if (user.username) {
      throw new Error("이미 가입한 사용자입니다.");
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { username: newNickname }, // username 필드에 newNickname 값 업데이트
    });

    return updatedUser;
  } catch (error) {
    console.error("Error updating user nickname:", error);
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
}

export async function createPost({
  title,
  content,
  language,
}: PostActionsProps) {
  const session = await auth();
  const userId = session?.user?.id;
  const username = session?.user?.username;

  if (!userId || !username) {
    throw new Error("로그인이 필요합니다.");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true },
  });

  if (!user || !user.name) {
    throw new Error("사용자 정보를 찾을 수 없습니다.");
  }

  const newPost = await prisma.posts.create({
    data: {
      uuid: userId,
      username,
      title: title,
      content: content,
      language: language,
    },
  });

  return newPost;
}

export const createComment = async ({
  comment,
  post_id,
}: createCommentProps) => {
  const session = await auth();
  const uuid = session?.user?.id;
  const username = session?.user?.username;
  if (!uuid || !username) {
    throw new Error("로그인이 필요합니다.");
  }
  const user = await prisma.user.findUnique({
    where: { id: uuid },
    select: { name: true },
  });

  if (!user || !user.name) {
    throw new Error("사용자 정보를 찾을 수 없습니다.");
  }

  // 댓글 추가
  const newComment = await prisma.comment.create({
    data: {
      post_id,
      uuid,
      username: username,
      comment,
    },
  });

  // 댓글 수 증가
  await prisma.posts.update({
    where: { idx: post_id },
    data: {
      comment: {
        increment: 1,
      },
    },
  });

  const now = new Date();
  return {
    idx: newComment.idx,
    post_id: newComment.post_id,
    isAuthor: true,
    username: newComment.username,
    comment: newComment.comment,
    reg_dt: now.toString(),
  };
};

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const handleLike = async (
  post_id: string,
  isLike: boolean
): Promise<{ status: boolean; message: string }> => {
  try {
    const session = await auth();
    const uuid = session?.user?.id;
    const username = session?.user?.username;

    if (!uuid || !username) {
      return {
        status: false,
        message: "로그인이 필요합니다. 로그인하시겠습니까?",
      };
    }

    const postId = parseInt(post_id);

    // 좋아요 추가 또는 취소
    if (isLike) {
      // 이미 좋아요가 눌러졌는지 확인
      const existingLike = await prisma.likes.findFirst({
        where: {
          uuid,
          post_id: postId,
        },
      });

      if (existingLike) {
        return { status: false, message: "이미 좋아요를 눌렀습니다." };
      }

      // 좋아요 추가
      await prisma.posts.update({
        where: { idx: postId },
        data: {
          like: {
            increment: 1,
          },
        },
      });

      // 좋아요 테이블에 추가
      await prisma.likes.create({
        data: {
          uuid,
          post_id: postId,
        },
      });
      return { status: true, message: "좋아요가 추가되었습니다." };
    } else {
      // 좋아요가 눌러지지 않았는지 확인
      const existingLike = await prisma.likes.findFirst({
        where: {
          uuid,
          post_id: postId,
        },
      });

      if (!existingLike) {
        return {
          status: false,
          message:
            "좋아요를 취소할 수 없습니다. 좋아요를 눌렀던 기록이 없습니다.",
        };
      }

      // 좋아요 취소
      await prisma.posts.update({
        where: { idx: postId },
        data: {
          like: {
            decrement: 1,
          },
        },
      });

      // 좋아요 테이블에서 삭제
      await prisma.likes.delete({
        where: {
          idx: existingLike.idx,
        },
      });
      return { status: true, message: "좋아요가 취소되었습니다." };
    }
  } catch (error) {
    console.error("Error creating like:", error);
    return { status: false, message: "좋아요 처리 중 오류가 발생했습니다." };
  } finally {
    await prisma.$disconnect(); // 데이터베이스 연결 종료
  }
};

export const deletePost = async (post_id: number): Promise<boolean> => {
  try {
    const session = await auth();
    const uuid = session?.user?.id;
    if (!uuid) {
      throw new Error("로그인이 필요합니다.");
    }
    const post = await prisma.posts.findFirst({
      where: {
        idx: post_id,
        uuid,
      },
    });
    if (!post) {
      throw new Error("적법한 사용자가 아닙니다.");
    }

    await prisma.posts.delete({
      where: {
        idx: post_id,
      },
    });

    return true;
  } catch (error) {
    console.error("Error processing request:", error);
    throw new Error("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
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

    if (!useruuid) {
      throw new Error("로그인이 필요합니다.");
    }

    // 작성자 확인
    const author = await prisma.posts.findFirst({
      where: {
        idx: parseInt(post_id, 10),
        uuid: useruuid,
      },
    });

    if (!author) {
      return {
        message: "권한이 없습니다.",
      };
    }

    // 게시글 존재 여부 확인
    const post = await prisma.posts.findUnique({
      where: { idx: parseInt(post_id, 10) },
    });

    if (!post) {
      return {
        message: "게시글이 존재하지 않습니다.",
      };
    }

    // 게시글 업데이트
    await prisma.posts.update({
      where: { idx: parseInt(post_id, 10) },
      data: {
        title,
        content,
        language,
      },
    });

    return { message: "update success" };
  } catch (error) {
    console.error("Error processing request:", error);
    throw new Error("알 수 없는 오류가 발생했습니다.");
  }
};
