"use client";

import { createComment } from "@/app/lib/actions";
import Textarea from "@/app/ui/TextArea";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";

type CommentFormProp = {
  post_id: string;
};

export default function CommentForm({ post_id }: CommentFormProp) {
  const { data: user } = useSession();
  const [comment, setComment] = useState("");

  const onSubmit = async (e: FormEvent) => {
    if (!user || !user.user) return;
    e.preventDefault();
    const data = await createComment({
      comment,
      post_id,
      uuid: user.user.id,
      nickname: user.user.nickname as string,
    });
    console.log(data);
  };
  return (
    <div>
      <div>댓글달기</div>
      {user ? (
        <div>
          <form onSubmit={onSubmit}>
            <Textarea
              className="h-12"
              markdown={comment}
              onMarkdownChange={(e) => setComment(e.target.value)}
            />
            <div className="w-full flex justify-end mt-1">
              <button>
                <Send />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>로그인이 필요합니다</div>
      )}
    </div>
  );
}
