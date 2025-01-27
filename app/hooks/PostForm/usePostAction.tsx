import { createPost, editPost } from "@/app/lib/actions";
import { ActionState } from "@/app/lib/definitions";
import { redirect } from "next/navigation";
import { useActionState } from "react";
import { z } from "zod";

type usePostActionProps = {
  post_id: string | null;
};

const FormSchema = z.object({
  language: z.string(),
  title: z.string(),
  content: z.string(),
});

export default function usePostAction({ post_id }: usePostActionProps) {
  async function FormAction(
    _: ActionState,
    formData: FormData
  ): Promise<ActionState> {
    const { language, title, content } = FormSchema.parse({
      language: formData.get("language"),
      title: formData.get("title"),
      content: formData.get("content"),
    });
    let response;
    if (post_id) {
      // 게시글 수정
      response = await editPost({ title, content, language, post_id });
    } else {
      // 게시글 만들기
      response = await createPost({ title, content, language });
    }

    if (!response.success) {
      return response;
    }
    redirect("/");
    // return { success: true, message: "" };
  }

  // PostForm  = {success:boolean, message:에러 또는 성공 메세지}
  // PostFormAction = action
  const [PostForm, PostFormAction, isPending] = useActionState(FormAction, {
    success: false,
    message: null,
  });

  return { PostForm, PostFormAction, isPending };
}
