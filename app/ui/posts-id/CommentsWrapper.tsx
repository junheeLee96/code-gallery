"use client";

import { useState } from "react";
import CommentForm from "./CommentForm";
import Comments from "./Comment";
import useInfiniteQueryHook from "@/app/hooks/useInfiniteQueryHook";
import { CommentsTypes } from "@/app/lib/definitions";
import useScrollLoaer from "@/app/hooks/useScrollLoader";
import { getComments } from "@/app/lib/data";
import Wrapper from "../Wrapper";
import Comment from "./Comment";

type CommentsWrapperProps = {
  post_id: string;
  date: Date;
};

export default function CommentsWrapper({
  post_id,
  date,
}: CommentsWrapperProps) {
  const [comments, setComments] = useState<CommentsTypes[]>([]);

  const { data, fetchNextPage, isLoading, hasNextPage } = useInfiniteQueryHook({
    queryKey: ["comments", post_id, date],
    queryFn: getComments,
  });
  console.log(data);

  useScrollLoaer({ fetchNextPage, hasNextPage });

  return (
    <div className="pb-20">
      <Wrapper>
        <CommentForm post_id={post_id} />
      </Wrapper>
      <Wrapper>
        {data?.pages.map((comments) =>
          comments.comments.map((comment, idx) => (
            <Comment comment={comment} key={idx} />
          ))
        )}
      </Wrapper>
      {isLoading && <div>load</div>}
    </div>
  );
}
