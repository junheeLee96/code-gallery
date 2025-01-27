"use client";

import Textarea from "@/app/ui/common/TextArea";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import useCommentForm from "../../hooks/CommentForm/useCommentForm";
import Comment from "./Comment";
import { CommentsTypes } from "@/app/lib/definitions";
import useCommentAction from "@/app/hooks/CommentForm/useCommentAction";

type CommentFormProp = {
  post_id: number;
};

export default function CommentForm({ post_id }: CommentFormProp) {
  const { data: user } = useSession();

  const { onMarkdownChange, comment, comments, handleSuccess } =
    useCommentForm();

  const { CommentForm, CommentFormAction, isPending } = useCommentAction({
    post_id,
    handleSuccess,
  });

  if (!user) return null;

  return (
    <div>
      <div>댓글달기</div>
      <div>
        {CommentForm.message && (
          <p className="text-red-500">오류: {CommentForm.message}</p>
        )}
        <form action={CommentFormAction}>
          <Textarea
            className="h-12"
            markdown={comment}
            onMarkdownChange={onMarkdownChange}
            name="comment"
            // placeholder={""}
          />
          <div className="w-full flex justify-end mt-1">
            <button type="submit" disabled={isPending}>
              <Send />
            </button>
          </div>
        </form>
      </div>
      {comments.map((comment: CommentsTypes, idx: number) => (
        <Comment comment={comment} key={idx} />
      ))}
    </div>
  );
}
