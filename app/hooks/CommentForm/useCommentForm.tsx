import { createComment } from "@/app/lib/actions";
import { ChangeEvent, FormEvent, useActionState, useState } from "react";
import { ActionState, CommentsTypes } from "../../lib/definitions";
import useCommentAction from "./useCommentAction";

export default function useCommentForm() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<CommentsTypes[]>([]);

  function handleSuccess(newComment: CommentsTypes) {
    setComments((p) => [...p, newComment]);
    setComment("");
  }

  function onMarkdownChange(e: ChangeEvent<HTMLTextAreaElement>) {
    setComment(e.target.value);
  }

  // const { CommentForm, CommentFormAction, isPending } = useCommentAction({
  //   post_id,
  //   handleSuccess,
  // });

  return {
    // CommentForm,
    // CommentFormAction,
    // isPending,
    comment,
    comments,
    onMarkdownChange,
    handleSuccess,
  };

  // async function FormAction(_: ActionState, formData: FormData): ActionState {
  //   const comment = formData.get("comment");
  //   if (typeof comment !== "string") return { success: false, message: "" };

  //   const response = await createComment({ post_id, comment });
  //   // if (!response.success)
  //   console.log(response);
  //   return response;

  //   // return { success: true, message: "complete" };
  // }

  // const [CommentForm, CommentFormAction, isPending] = useActionState(
  //   FormAction,
  //   {
  //     success: false,
  //     message: null,
  //   }
  // );

  // return { CommentForm, CommentFormAction, isPending };
  // const [comment, setComment] = useState("");
  // const [comments, setComments] = useState<CommentsTypes[]>([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<null | string>(null);

  // const onCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   setComment(e.target.value);
  // };

  // const onSubmit = async (e: FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     const newComment = await createComment({
  //       comment,
  //       post_id,
  //     });
  //     setComments((p) => [
  //       ...p,
  //       { ...newComment, reg_dt: new Date(newComment.reg_dt) },
  //     ]);

  //     setComment("");
  //   } catch (e) {
  //     console.error(e as Error);
  //     setError("오류가 발생했습니다. 새로고침 후 다시 시도해주세요.");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // return {
  //   comments,
  //   comment,
  //   isLoading,
  //   onCommentChange,
  //   onSubmit,
  //   error,
  // };
}
