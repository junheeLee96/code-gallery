"use client";

import { useEffect, useState } from "react";
import { PostTypes } from "../../lib/definitions";
import Markdown from "./Markdown";
import UserName from "./UserName";
import { truncateText } from "@/app/lib/utils";

type PostPropTypes = {
  post: PostTypes;
};

export default function Post({ post }: PostPropTypes) {
  const [content, setContent] = useState<string>(post.content);
  const [isTruncated, setIsTruncated] = useState(false);

  const handleIsTruncated = () => {
    if (!isTruncated) return;
    setIsTruncated(false);
    setContent(post.content);
  };

  useEffect(() => {
    const [truncate, newContent] = truncateText(post.content);
    setIsTruncated(truncate);
    setContent(newContent);
  }, [post]);

  return (
    <div>
      <UserName
        nickname={post.nickname}
        isAuthor={post.isAuthor}
        reg_dt={post.reg_dt}
      />
      <Markdown markdown={content} language={post.language} />
      {isTruncated && (
        <button onClick={handleIsTruncated} className="text-sm">
          더보기
        </button>
      )}
    </div>
  );
}
