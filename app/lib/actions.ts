"use server";

import { PrismaClient } from "@prisma/client";
import { MAX_LENGTH_USER_NICKNAME, TITLE_MAX_LENGTH } from "./length";
import { auth } from "@/auth";
import {
  ActionState,
  CommentsTypes,
  createCommentProps,
  PostActionsProps,
} from "./definitions";

const prisma = new PrismaClient();

export async function createNewUser(username: string): Promise<ActionState> {
  const session = await auth();
  const uuid = session?.user?.id;
  if (typeof username !== "string") {
    return { success: false, message: "적법한 닉네임이 아닙니다." };
  }
  if (
    !username ||
    username === "" ||
    username.length > MAX_LENGTH_USER_NICKNAME
  ) {
    return {
      success: false,
      message: `닉네임은 1글자 이상, ${MAX_LENGTH_USER_NICKNAME}이하입니다.`,
    };
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: uuid },
      select: { name: true, username: true },
    });

    if (!user || !uuid) {
      return { success: false, message: "사용자를 찾을 수 없습니다." };
    }

    if (user.username !== null) {
      return { success: false, message: "이미 가입한 사용자입니다." };
    }
    await prisma.user.update({
      where: { id: session.user.id },
      data: { username: username },
    });

    return { success: true, message: "사용자가 성공적으로 생성되었습니다." };
  } catch (e) {
    console.error("error on sign-up ", e);
    return {
      success: false,
      message:
        e instanceof Error
          ? e.message
          : "오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  } finally {
    await prisma.$disconnect();
  }
}

export async function createPost({
  title,
  content,
  language,
}: PostActionsProps): Promise<ActionState> {
  const session = await auth();
  const userId = session?.user?.id;
  const username = session?.user?.username;
  if (title.length <= 1 || title.length > TITLE_MAX_LENGTH) {
    return {
      success: false,
      message: `제목은 2글자 이상, ${TITLE_MAX_LENGTH}이하입니다.`,
    };
  }

  if (!userId || !username) {
    return { success: false, message: "로그인이 필요합니다." };
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { name: true },
  });

  if (!user || !user.name) {
    return { success: false, message: "사용자 정보를 찾을 수 없습니다." };
  }

  await prisma.posts.create({
    data: {
      uuid: userId,
      username,
      title: title,
      content: content,
      language: language,
    },
  });

  return { success: true, message: null };
}

export const createComment = async ({
  comment,
  post_id,
}: createCommentProps): Promise<ActionState & { data?: CommentsTypes }> => {
  const session = await auth();
  const uuid = session?.user?.id;
  const username = session?.user?.username;
  if (!uuid || !username) {
    return { success: false, message: "로그인이 필요합니다." };
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id: uuid },
      select: { name: true },
    });

    if (!user || !user.name) {
      return { success: false, message: "사용자 정보를 찾을 수 없습니다." };
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
    const data: CommentsTypes = {
      idx: newComment.idx,
      post_id: newComment.post_id,
      isAuthor: true,
      username: newComment.username,
      comment: newComment.comment,
      reg_dt: now.toString(),
    };
    return { success: true, message: null, data };
  } catch (e) {
    console.error("Error on CommentForm ", e);
    return {
      success: false,
      message: e instanceof Error ? e.message : "오류가 발생했습니다.",
    };
  }
};

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
}: PostActionsProps & { post_id: string }): Promise<ActionState> => {
  try {
    const session = await auth();
    const useruuid = session?.user?.id;

    if (!useruuid) {
      return { success: false, message: "로그인이 필요합니다." };
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
        success: false,
        message: "권한이 없습니다.",
      };
    }

    // 게시글 존재 여부 확인
    const post = await prisma.posts.findUnique({
      where: { idx: parseInt(post_id, 10) },
    });

    if (!post) {
      return {
        success: false,
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

    return { success: true, message: "update success" };
  } catch (e) {
    console.error("Error processing on editPost request:", e);
    return {
      success: false,
      message: e instanceof Error ? e.message : "오류가 발생했습ㄴ디ㅏ.",
    };
  }
};
