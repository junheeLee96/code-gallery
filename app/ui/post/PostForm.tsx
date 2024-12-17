"use client";

import Textarea from "../common/TextArea";
import Markdown from "../common/Markdown";
import Languages from "../common/Languages";
import usePostForm from "@/app/hooks/usePostForm";
import { SendHorizonal } from "lucide-react";
import Button from "../common/Button";

type PostFormTypes = {
  isMarkdownRender: boolean;
};

export default function PostForm({ isMarkdownRender }: PostFormTypes) {
  const {
    content,
    language,
    onLanguageChange,
    onContentChange,
    onSubmit,
    error,
  } = usePostForm();
  return (
    <>
      <form onSubmit={onSubmit}>
        <Languages onChange={onLanguageChange} />
        <Textarea
          markdown={content}
          onMarkdownChange={onContentChange}
          className="h-[350px]"
        />
        {isMarkdownRender && (
          <Markdown markdown={content} language={language} />
        )}
        <Button className="flex items-center justify-center">
          <SendHorizonal />
          <span className="ml-2">게시하기</span>
        </Button>
      </form>
      {error && error}
    </>
  );
}
