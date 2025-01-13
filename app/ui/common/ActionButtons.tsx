"use client";

import useActionButton from "@/app/hooks/useActionButton";
import Button from "./Button";

type ActionsButtonsProps = {
  post_id: string;
};

export default function ActionsButtons({ post_id }: ActionsButtonsProps) {
  const { isLoading, onEdit, onDelete } = useActionButton({ post_id });

  return (
    <div className="flex gap-1 text-sm">
      <Button disabled={isLoading} onClick={onEdit}>
        수정
      </Button>
      <Button disabled={isLoading} onClick={onDelete}>
        삭제
      </Button>
    </div>
  );
}
