"use client";

import useActionButton from "@/app/hooks/useActionButton";
import Button from "../Button";

type PostActionsButtons = {
  post_id: string;
};

export default function PostActionsButtons({ post_id }: PostActionsButtons) {
  const { isLoading, onEdit, onDelete } = useActionButton({ post_id });

  return (
    <div className="flex gap-1 text-sm">
      <EditButton onEdit={onEdit} isLoading={isLoading} />
      <DeleteButton onDelete={onDelete} isLoading={isLoading} />
    </div>
  );
}

function EditButton({
  onEdit,
  isLoading,
}: {
  isLoading: boolean;
  onEdit: () => void;
}) {
  return (
    <Button disabled={isLoading} onClick={onEdit}>
      수정
    </Button>
  );
}

function DeleteButton({
  onDelete,
  isLoading,
}: {
  isLoading: boolean;
  onDelete: () => void;
}) {
  return (
    <Button disabled={isLoading} onClick={onDelete}>
      삭제
    </Button>
  );
}
