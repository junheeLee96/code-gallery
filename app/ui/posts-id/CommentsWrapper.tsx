"use client";

import CommentForm from "./CommentForm";
import useInfiniteQueryHook from "@/app/hooks/useInfiniteQueryHook";
import useScrollLoaer from "@/app/hooks/useScrollLoader";
import { getComments } from "@/app/lib/client-data";
import Wrapper from "../common/Wrapper";
import Comment from "./Comment";

type CommentsWrapperProps = {
  post_id: number;
  date: Date;
};

export default function CommentsWrapper({
  post_id,
  date,
}: CommentsWrapperProps) {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQueryHook({
    queryKey: ["comments", post_id, date],
    queryFn: getComments,
  });

  useScrollLoaer({ fetchNextPage, hasNextPage });
  return (
    <div className="pb-20">
      <Wrapper>
        <CommentForm post_id={post_id} />
        {data?.pages.map((comments) =>
          comments?.data.map((comment, idx) => (
            <Comment comment={comment} key={idx} />
          ))
        )}
        {/* {isLoading && <div>load</div>} */}
      </Wrapper>
    </div>
  );
}
