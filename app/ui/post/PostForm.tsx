"use client";

import Textarea from "../common/TextArea";
import Markdown from "../common/Markdown";
import Languages from "../common/Languages";
import usePostForm from "@/app/hooks/usePostForm";
import { SendHorizonal } from "lucide-react";
import Button from "../common/Button";
import Loading from "../common/Loading";
import Input from "../common/input";
import { PostTypes } from "@/app/lib/definitions";

type PostFormTypes = {
  isMarkdownRender: boolean;
  initialPost?: PostTypes;
};

export default function PostForm({
  isMarkdownRender,
  initialPost,
}: PostFormTypes) {
  const {
    title,
    content,
    language,
    onLanguageChange,
    onTitleChange,
    onContentChange,
    onSubmit,
    error,
    isLoading,
  } = usePostForm({ initialPost });

  return (
    <form onSubmit={onSubmit}>
      <Languages onChange={onLanguageChange} value={language} />
      <div>
        <Input
          title={title}
          onInputChange={onTitleChange}
          placeholder="제목을 적어주세요."
        />
      </div>
      <Textarea
        markdown={content}
        onMarkdownChange={onContentChange}
        className="h-[350px] mt-5"
      />
      {isMarkdownRender && <Markdown markdown={content} language={language} />}
      <Button
        type="submit"
        className="flex items-center justify-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <SendHorizonal />
            <span className="ml-2">게시하기</span>
          </>
        )}
      </Button>
      {error && <div className="text-red-500 mt-2">{error.message}</div>}
    </form>
  );
}
