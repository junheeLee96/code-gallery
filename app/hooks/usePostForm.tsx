"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { createPost } from "../lib/actions";

export default function usePostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitle(value);
  };

  const onContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createPost({ title, content, language });
      setIsLoading(false);
      // redirect("/");
    } catch (e) {
      console.error(e as Error);
      setError(e);
      setIsLoading(false);
    }
  };

  return {
    title,
    content,
    language,
    onLanguageChange,
    onTitleChange,
    onContentChange,
    onSubmit,
    error,
    isLoading,
  };
}
