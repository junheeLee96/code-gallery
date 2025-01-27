import { ChangeEvent, useState } from "react";

type usePostContentProps = {
  InitialContent: string;
};

export default function usePostContent({
  InitialContent,
}: usePostContentProps) {
  const [content, setContent] = useState(InitialContent);

  function handleContent(e: ChangeEvent<HTMLTextAreaElement>) {
    setContent(e.target.value);
  }

  return { content, handleContent };
}
