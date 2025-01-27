import { createComment } from "@/app/lib/actions";
import { ActionState, CommentsTypes } from "@/app/lib/definitions";
import { useActionState } from "react";

type useCommentActionProps = {
  post_id: number;
  handleSuccess: (newComment: CommentsTypes) => void;
};
export default function useCommentAction({
  post_id,
  handleSuccess,
}: useCommentActionProps) {
  async function FormAction(
    _: ActionState,
    formData: FormData
  ): Promise<ActionState> {
    const comment = formData.get("comment");
    if (typeof comment !== "string") return { success: false, message: "" };

    const response = await createComment({ post_id, comment });
    // if (!response.success)
    console.log(response);

    if (response.success && response.data) {
      const newComment = response.data;
      handleSuccess(newComment);
    }
    return response;

    // return { success: true, message: "complete" };
  }

  const [CommentForm, CommentFormAction, isPending] = useActionState(
    FormAction,
    {
      success: false,
      message: null,
    }
  );

  return { CommentForm, CommentFormAction, isPending };
}
