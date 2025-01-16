"use client";

import { useState } from "react";
import { deletePost } from "../lib/actions";
import { useRouter } from "next/navigation";
import { useToastMessageContext } from "../providers/ToastMessageProvider";

type useActionButtonProps = {
  post_id: string;
};

export default function useActionButton({ post_id }: useActionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { showToastMessage } = useToastMessageContext();

  const router = useRouter();

  const onEdit = async () => {
    setIsLoading(true);
    router.push(`/post/${post_id}/edit`);
  };

  const onDelete = async () => {
    setIsLoading(true);
    try {
      const data = await deletePost(post_id);
      if (data.message === "Delete successfully") {
        alert("성공적으로 삭제되었습니다.");
        router.push("/");
      } else {
        showToastMessage({ message: data.message, type: data.type });
        alert(data.message);
      }
    } catch (e) {
      console.error(e);
      const message = "오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      const type = "error";
      showToastMessage({ message, type });
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, onEdit, onDelete };
}
