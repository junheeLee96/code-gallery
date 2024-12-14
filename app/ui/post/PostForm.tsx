"use client";

import Textarea from "../TextArea";
import Markdown from "../Markdown";
import { ChangeEvent, useState } from "react";
import Languages from "../Languages";

type PostFormTypes = {
  isMarkdownRender: boolean;
  action: (FormData: FormData) => void;
};

export default function PostForm({ isMarkdownRender, action }: PostFormTypes) {
  const [markdown, setMarkdown] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const onMarkdownChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(e.target.value);
  };
  return (
    <form action={action}>
      <Languages onChange={onLanguageChange} />
      <Textarea markdown={markdown} onMarkdownChange={onMarkdownChange} />
      {isMarkdownRender && <Markdown markdown={markdown} language={language} />}
      <button className="cursor-pointer">submit</button>
    </form>
  );
}
