"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { createPost, editPost } from "../lib/actions";
import { PostTypes } from "../lib/definitions";
import { useRouter } from "next/navigation";

type usePostFormProps = {
  initialPost?: PostTypes;
};

export default function usePostForm({ initialPost }: usePostFormProps) {
  const router = useRouter();
  const [title, setTitle] = useState(initialPost ? initialPost.title : "");
  const [content, setContent] = useState(
    initialPost ? initialPost.content : ""
  );
  const [language, setLanguage] = useState(
    initialPost ? initialPost.language : "javascript"
  );
  const [error, setError] = useState<Error | null>(null);
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
    if (title === "" || content === "") {
      return;
    }
    setIsLoading(true);
    try {
      if (initialPost) {
        // post 수정하기
        await editPost({
          title,
          content,
          language,
          post_id: String(initialPost.idx),
        });
      } else {
        // post 만들기
        await createPost({ title, content, language });
      }

      router.push("/");
    } catch (e) {
      console.error(e);
      setError(
        e instanceof Error ? e : new Error("알 수 없는 오류가 발생했습니다.")
      );
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
