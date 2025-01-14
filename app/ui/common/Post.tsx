"use client";

import { useState } from "react";
import { PostTypes } from "../../lib/definitions";
import Markdown from "./Markdown";
import UserName from "./UserName";
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
  const [content, setContent] = useState<string>(truncatedPost || post.content);
  const [isContentTruncated, setIsContentTruncated] = useState(isTruncated);

  const handleExpandContent = () => {
    setContent(post.content);
    setIsContentTruncated(false);
  };

  return (
    <div className="post">
      <UserName
        nickname={post.nickname}
        isAuthor={post.isAuthor}
        post_id={String(post.idx)}
        reg_dt={post.reg_dt}
      />
      <Markdown markdown={content} language={post.language} />
      {isContentTruncated && <ViewMoreButton onClick={handleExpandContent} />}
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
