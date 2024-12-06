"use client";

import Textarea from "../TextArea";
import Markdown from "../Markdown";
import { ChangeEvent, useState } from "react";

type PostFormTypes = {
  isMarkdownRender: boolean;
  action: (FormData: FormData) => void;
};

export default function PostForm({ isMarkdownRender, action }: PostFormTypes) {
  const [markdown, setMarkdown] = useState("");

  const onMarkdownChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };
  return (
    <form action={action}>
      <Textarea markdown={markdown} onMarkdownChange={onMarkdownChange} />
      {isMarkdownRender && <Markdown markdown={markdown} />}
      <button className="cursor-pointer">submit</button>
    </form>
  );
}
