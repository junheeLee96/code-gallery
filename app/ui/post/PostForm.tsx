"use client";

import Textarea from "../common/TextArea";
import Markdown from "../common/post/Markdown";
import Languages from "../common/Languages";
import { SendHorizonal } from "lucide-react";
import Button from "../common/Button";
import Loading from "../common/Loading";
import Input from "../common/input";
import { PostTypes } from "@/app/lib/definitions";
import usePostTitle from "@/app/hooks/PostForm/usePostTitle";
import usePostContent from "@/app/hooks/PostForm/usePostContent";
import usePostAction from "@/app/hooks/PostForm/usePostAction";
import usePostLanguage from "@/app/hooks/PostForm/usePostLanguage";
import { TITLE_MAX_LENGTH } from "@/app/lib/length";

type PostFormTypes = {
  isMarkdownRender: boolean;
  initialPost?: PostTypes;
};

export default function PostForm({
  isMarkdownRender,
  initialPost,
}: PostFormTypes) {
  const { PostForm, PostFormAction, isPending } = usePostAction({
    post_id: initialPost ? String(initialPost.idx) : null,
  });

  const { title, TitleError, handleTitle } = usePostTitle({
    InitialTitle: initialPost ? initialPost.title : "",
  });

  const { content, handleContent } = usePostContent({
    InitialContent: initialPost ? initialPost.content : "",
  });

  const { language, handleLanguage } = usePostLanguage({
    InitialLanguage: initialPost ? initialPost.language : "javascript",
  });

  return (
    <form action={PostFormAction}>
      <Languages onChange={handleLanguage} value={language} name="language" />
      <div>
        <Input
          value={title}
          label="제목"
          name="title"
          onChange={handleTitle}
          placeholder="제목을 적어주세요."
        />
        <p className="text-gray-500">
          ({title.length}/{TITLE_MAX_LENGTH})
        </p>
        {TitleError && <p className="text-red-500">{TitleError}</p>}
      </div>
      <Textarea
        name="content"
        markdown={content}
        onMarkdownChange={handleContent}
        className="h-[350px] mt-5"
      />
      {isMarkdownRender && <Markdown markdown={content} language={language} />}
      <Button
        type="submit"
        className="flex items-center justify-center"
        disabled={isPending}
      >
        {isPending ? (
          <Loading />
        ) : (
          <>
            <SendHorizonal />
            <span className="ml-2">게시하기</span>
          </>
        )}
      </Button>
      {/* PostForm?.message은 서버에러 */}
      <p className="text-red-500">{PostForm?.message}</p>
      {/* {error && <div className="text-red-500 mt-2">{error.message}</div>} */}
    </form>
  );
}
