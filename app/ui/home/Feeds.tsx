"use client";

import { ChangeEvent } from "react";
import Post from "../Post";
import { PostTypes } from "@/app/lib/definitions";
import Languages from "../languages";
import { useLanguageStore } from "@/app/providers/zustand/language-store-provider";
import AddCommentBtn from "./add-comment-btn";
import useInfiniteQueryHook from "@/app/hooks/useInfiniteQueryHook";
import useScrollLoaer from "@/app/hooks/useScrollLoader";
import { getPosts } from "@/app/lib/data";

export default function Feeds() {
  const { language, setLanguage } = useLanguageStore((state) => state);
  const { data, hasNextPage, fetchNextPage, isLoading } = useInfiniteQueryHook({
    queryKey: ["posts", language],
    queryFn: getPosts,
  });
  useScrollLoaer({ hasNextPage, fetchNextPage });

  const onLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  //todo: isLoading인 경우 스켈레톤
  return (
    <div>
      <div>
        <Languages onChange={onLanguageChange} isWholeRender={true} />
      </div>
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.posts.map((post: PostTypes, idx: number) => (
            <div key={post.idx || idx} className="mt-4 bg-red-500">
              <div>{post.idx}</div>
              <Post post={post} />
              <AddCommentBtn post_id={post.idx} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
