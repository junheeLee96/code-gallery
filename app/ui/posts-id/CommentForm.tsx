"use client";

import Textarea from "@/app/ui/TextArea";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import useCommentForm from "./useCommentForm";

type CommentFormProp = {
  post_id: string;
};

export default function CommentForm({ post_id }: CommentFormProp) {
  const { data: user } = useSession();
  const { comment, isLoading, error, onCommentChange, onSubmit } =
    useCommentForm({
      uuid: user?.user.id as string,
      nickname: user?.user.nickname as string,
      post_id,
    });
  // const [comment, setComment] = useState("");

  // const onSubmit = async (e: FormEvent) => {
  //   if (!user || !user.user) return;
  //   e.preventDefault();
  //   const data = await createComment({
  //     comment,
  //     post_id,
  //     uuid: user.user.id,
  //     nickname: user.user.nickname as string,
  //   });
  //   console.log(data);
  // };

  if (!user) return <div>로그인이 필요합니다.</div>;

  return (
    <div>
      <div>댓글달기</div>
      <div>
        {error && (
          <div>오류가 발생했습니다. 새로고침 후, 다시 시도해주세요.</div>
        )}
        <form onSubmit={onSubmit}>
          <Textarea
            className="h-12"
            markdown={comment}
            onMarkdownChange={onCommentChange}
          />
          <div className="w-full flex justify-end mt-1">
            <button disabled={isLoading}>
              <Send />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
