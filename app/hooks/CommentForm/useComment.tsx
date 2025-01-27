import { ChangeEvent, useState } from "react";
import { CommentsTypes } from "../../lib/definitions";

export default function useComment() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<CommentsTypes[]>([]);

  function handleSuccess(newComment: CommentsTypes) {
    setComments((p) => [...p, newComment]);
    setComment("");
  }

  function onMarkdownChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setComment(e.target.value);
  }

  return {
    comment,
    comments,
    onMarkdownChange,
    handleSuccess,
  };
}
