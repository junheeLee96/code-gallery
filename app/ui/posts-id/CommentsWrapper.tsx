"use client";

import { useState } from "react";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import useInfiniteQueryHook from "@/app/hooks/useInfiniteQueryHook";
import { CommentsTypes } from "@/app/lib/definitions";
import useScrollLoaer from "@/app/hooks/useScrollLoader";
import { getComments } from "@/app/lib/data";

type CommentsWrapperProps = {
  post_id: string;
};

export default function CommentsWrapper({ post_id }: CommentsWrapperProps) {
  const [comments, setComments] = useState<CommentsTypes[]>([]);

  const { data, fetchNextPage, isLoading, hasNextPage } = useInfiniteQueryHook({
    queryKey: ["comments", post_id],
    queryFn: getComments,
  });

  useScrollLoaer({ fetchNextPage, hasNextPage });

  return (
    <div>
      <CommentForm post_id={post_id} />
      <Comments post_id={post_id} />
    </div>
  );
}
