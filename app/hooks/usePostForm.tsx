"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { createPost } from "../lib/actions";
import { redirect } from "next/navigation";

export default function usePostForm() {
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [error, setError] = useState(null);

  const onLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createPost({ content, language });
      redirect("/");
    } catch (e) {
      console.error(e as Error);
      setError(e);
    }
  };

  return {
    content,
    language,
    onLanguageChange,
    onContentChange,
    onSubmit,
    error,
  };
}
