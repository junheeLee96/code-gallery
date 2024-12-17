import { createComment } from "@/app/lib/actions";
import { ChangeEvent, FormEvent, useState } from "react";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
      setComment("");
      setIsLoading(false);
    } catch (e) {
      setError(e as Error);
    }
  };

  return {
    comment,
    isLoading,
    onCommentChange,
    onSubmit,
    error,
  };
}
