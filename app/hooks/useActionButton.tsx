"use client";

import { useState } from "react";
import { deletePost } from "../lib/actions";
import { useRouter } from "next/navigation";
import { useToastMessageContext } from "../providers/ToastMessageProvider";

type useActionButtonProps = {
  post_id: number;
};

export default function useActionButton({ post_id }: useActionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { showToastMessage } = useToastMessageContext();

  const router = useRouter();

  const onEdit = async () => {
    router.push(`/post/${post_id}/edit`);
  };

  const onDelete = async () => {
    setIsLoading(true);
    try {
      await deletePost(post_id);
    } catch (e) {
      console.error(e);
      const message =
        e instanceof Error ? e.message : "알 수 없는 오류가 발생했습니다.";

      showToastMessage({
        message,
        type: "error",
      });
    }
  };
  return { isLoading, onEdit, onDelete };
}
