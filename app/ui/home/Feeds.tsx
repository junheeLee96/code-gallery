"use client";

import { ChangeEvent } from "react";
import Post from "../common/Post";
import { PostTypes } from "@/app/lib/definitions";
import { useLanguageStore } from "@/app/providers/zustand/language-store-provider";
import AddCommentBtn from "./add-comment-btn";
import useInfiniteQueryHook from "@/app/hooks/useInfiniteQueryHook";
import useScrollLoaer from "@/app/hooks/useScrollLoader";
import { getPosts } from "@/app/lib/data";
import Wrapper from "../common/Wrapper";
import Languages from "../common/Languages";
import FeedSkeleton from "../skeletons/feed/FeedSkeleton";
import Sorting from "./Sorting";

export default function Feeds({ date }: { date: Date }) {
  const { language, setLanguage } = useLanguageStore((state) => state);
  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQueryHook({
      queryKey: ["posts", language, date],
      queryFn: getPosts,
    });
  useScrollLoaer({ hasNextPage, fetchNextPage });

  const onLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };
  //todo: isLoading인 경우 스켈레톤
  return (
    <div className="pb-20">
      <Wrapper>
        <div className="flex">
          <div className="mr-2">
            <Languages onChange={onLanguageChange} isWholeRender={true} />
          </div>
          <div>
            <Sorting />
          </div>
        </div>
      </Wrapper>
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.posts.map((post: PostTypes, idx: number) => (
            <Wrapper key={post.idx || idx}>
              <Post post={post} />
              <div className="mt-3 pt-2 border-t border-gray-300">
                <AddCommentBtn post_id={post.idx} />
              </div>
            </Wrapper>
          ))}
        </div>
      ))}
      {(isLoading || isFetchingNextPage) && <FeedSkeleton />}
    </div>
  );
}
