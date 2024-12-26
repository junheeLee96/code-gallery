import { createComment } from "@/app/lib/actions";
import { ChangeEvent, FormEvent, useState } from "react";
import { CommentsTypes } from "../lib/definitions";

type useCommentFormProps = {
  uuid: string;
  nickname: string;
  post_id: string;
};

export default function useCommentForm({
  uuid,
  nickname,
  post_id,
}: useCommentFormProps) {
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
      await createComment({
        comment,
        post_id,
        uuid,
        nickname,
      });
      const newComment: CommentsTypes = {
        idx: 0,
        post_id,
        comment,
        nickname,
        isAuthor: true,
        reg_dt: new Date().toISOString(),
      };
      setComments((p) => [...p, newComment]);
      setComment("");
      setIsLoading(false);
    } catch (e) {
      console.error(e as Error);
      setError("오류가 발생했습니다. 새로고침 후 다시 시도해주세요.");
      setIsLoading(false);
    }
  };

  return {
    comments,
    comment,
    isLoading,
    onCommentChange,
    onSubmit,
    error,
  };
}
