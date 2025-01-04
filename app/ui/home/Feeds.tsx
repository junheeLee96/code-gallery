"use client";

import Post from "../common/Post";
import { PostTypes } from "@/app/lib/definitions";
import AddCommentBtn from "./add-comment-btn";
import useInfiniteQueryHook from "@/app/hooks/useInfiniteQueryHook";
import useScrollLoaer from "@/app/hooks/useScrollLoader";
import { getPosts } from "@/app/lib/data";
import Wrapper from "../common/Wrapper";
import {
  useLanguageStore,
  useSortingStore,
  useTimePeriodStore,
} from "@/app/providers/zustand";
import { truncateText } from "@/app/lib/utils";

export default function Feeds({ date }: { date: Date }) {
  const { sorting } = useSortingStore((state) => state);
  const { language } = useLanguageStore((state) => state);
  const { timePeriod } = useTimePeriodStore((state) => state);

  const { data, hasNextPage, fetchNextPage } = useInfiniteQueryHook({
    queryKey: ["posts", language, date, sorting, timePeriod],
    queryFn: getPosts,
  });
  useScrollLoaer({ hasNextPage, fetchNextPage });

  return (
    <div className="pb-20">
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page?.data.map((post: PostTypes, idx: number) => {
            const [isTruncated, newContent] = truncateText(post.content);
            return (
              <Wrapper key={post.idx || idx}>
                <Post
                  post={post}
                  truncatedPost={newContent}
                  isTruncated={isTruncated}
                />
                <div className="mt-3 pt-2 border-t border-gray-300">
                  <AddCommentBtn post_id={post.idx} />
                </div>
              </Wrapper>
            );
          })}
        </div>
      ))}
    </div>
  );
}
