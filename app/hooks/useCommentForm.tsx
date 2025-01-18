import { createComment } from "@/app/lib/actions";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { CommentsTypes } from "../lib/definitions";

type useCommentFormProps = {
  post_id: number;
};

export default function useCommentForm({ post_id }: useCommentFormProps) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<CommentsTypes[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const onCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const newComment = await createComment({
        comment,
        post_id,
      });
      setComments((p) => [
        ...p,
        { ...newComment, reg_dt: new Date(newComment.reg_dt) },
      ]);

      setComment("");
    } catch (e) {
      console.error(e as Error);
      setError("오류가 발생했습니다. 새로고침 후 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log(comments);
  }, [comments]);

  return {
    comments,
    comment,
    isLoading,
    onCommentChange,
    onSubmit,
    error,
  };
}
