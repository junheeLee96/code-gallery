"use client";

import { useEffect, useState } from "react";
import { PostTypes } from "../../lib/definitions";
import Markdown from "./Markdown";
import UserName from "./UserName";
import { truncateText } from "@/app/lib/utils";
import Like from "./Like";

type PostPropTypes = {
  post: PostTypes;
  truncatedPost?: string;
  isTruncated: boolean;
};

export default function Post({
  post,
  truncatedPost,
  isTruncated,
}: PostPropTypes) {
  const [content, setContent] = useState<string>(
    truncatedPost ? truncatedPost : post.content
  );
  const [isTruncatedFlag, setIsTruncatedFlag] = useState(isTruncated);

  const handleIsTruncated = () => {
    setContent(post.content);
    setIsTruncatedFlag(false);
  };

  return (
    <div>
      <UserName
        nickname={post.nickname}
        isAuthor={post.isAuthor}
        reg_dt={post.reg_dt}
      />
      <Markdown markdown={content} language={post.language} />
      {isTruncatedFlag && (
        <button onClick={handleIsTruncated} className="text-sm">
          더보기
        </button>
      )}
      <div>
        <Like
          id={String(post.idx)}
          likeCount={post.like}
          isInitialLiked={post.initialLike}
        />
      </div>
    </div>
  );
}
