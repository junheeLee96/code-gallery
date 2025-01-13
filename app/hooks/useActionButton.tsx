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
  };

  const onDelete = async () => {
    setIsLoading(true);
    try {
      const data = await deletePost(post_id);
      console.log("data = ", data);
      if (data.message === "Delete successfully") {
        alert("성공적으로 삭제되었습니다.");
        router.push("/");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, onEdit, onDelete };
}
