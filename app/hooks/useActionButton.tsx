"use client";

import { useState } from "react";
import { deletePost } from "../lib/actions";
import { useRouter } from "next/navigation";

type useActionButtonProps = {
  post_id: string;
};

export default function useActionButton({ post_id }: useActionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

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
        alert(data.message);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, onEdit, onDelete };
}
