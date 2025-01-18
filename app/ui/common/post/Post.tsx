"use client";

import { useState } from "react";
import { PostTypes } from "../../../lib/definitions";
import Markdown from "./Markdown";
import Like from "./Like";
import UserName from "./UserName";
import Title from "./Title";

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
  const [content, setContent] = useState<string>(truncatedPost || post.content);
  const [isContentTruncated, setIsContentTruncated] = useState(isTruncated);

  const handleExpandContent = () => {
    setContent(post.content);
    setIsContentTruncated(false);
  };

  return (
    <div className="post">
      <UserName
        username={post.username}
        isAuthor={post.isAuthor}
        post_id={post.idx}
        reg_dt={post.reg_dt}
      />
      <Title title={post.title} />
      <Markdown markdown={content} language={post.language} />
      {isContentTruncated && <ViewMoreButton onClick={handleExpandContent} />}
      <Like
        id={String(post.idx)}
        likeCount={post.like}
        isInitialLiked={post.initialLike}
      />
    </div>
  );
}

type ViewMoreButtonProps = {
  onClick: () => void;
};

function ViewMoreButton({ onClick }: ViewMoreButtonProps) {
  return (
    <button onClick={onClick} className="text-sm text-gray-500">
      더보기
    </button>
  );
}
