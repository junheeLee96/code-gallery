"use client";

import { useState } from "react";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import useInfiniteQueryHook from "@/app/hooks/useFetchPosts";

type CommentsWrapperProps = {
  post_id: string;
};

export default function CommentsWrapper({ post_id }: CommentsWrapperProps) {
  const [comments, setComments] = useState([]);

  const { data, fetchNextPage, isLoading, hasNextPage } = useInfiniteQueryHook({
    queryKey: ["comments", post_id],
  });

  return (
    <div>
      <CommentForm post_id={post_id} />
      <Comments post_id={post_id} />
    </div>
  );
}
