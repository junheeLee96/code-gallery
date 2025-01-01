"use client";

import Post from "../common/Post";
import { PostTypes } from "@/app/lib/definitions";
import AddCommentBtn from "./add-comment-btn";
import useInfiniteQueryHook from "@/app/hooks/useInfiniteQueryHook";
import useScrollLoaer from "@/app/hooks/useScrollLoader";
import { getPosts } from "@/app/lib/data";
import Wrapper from "../common/Wrapper";
import { useLanguageStore, useSortingStore } from "@/app/providers/zustand";

export default function Feeds({ date }: { date: Date }) {
  const { sorting } = useSortingStore((state) => state);
  const { language } = useLanguageStore((state) => state);

  const { data, hasNextPage, fetchNextPage } = useInfiniteQueryHook({
    queryKey: ["posts", language, date, sorting],
    queryFn: getPosts,
  });
  useScrollLoaer({ hasNextPage, fetchNextPage });

  return (
    <div className="pb-20">
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page?.data.map((post: PostTypes, idx: number) => (
            <Wrapper key={post.idx || idx}>
              <Post post={post} />
              <div className="mt-3 pt-2 border-t border-gray-300">
                <AddCommentBtn post_id={post.idx} />
              </div>
            </Wrapper>
          ))}
        </div>
      ))}
    </div>
  );
}
