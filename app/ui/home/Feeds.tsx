"use client";

import { ChangeEvent, useCallback, useEffect } from "react";
import Post from "../Post";
import { PostTypes } from "@/app/lib/definitions";
import useFetchPosts from "@/app/hooks/useFetchPosts";
import { languages } from "@/app/lib/languages";
import Languages from "../languages";
import { useLanguageStore } from "@/app/providers/zustand/language-store-provider";
import AddCommentBtn from "./add-comment-btn";

export default function Feeds() {
  const { language, setLanguage } = useLanguageStore((state) => state);
  const { data, hasNextPage, fetchNextPage, isLoading } = useFetchPosts({
    language,
  });

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      !hasNextPage
    )
      return;
    fetchNextPage();
  }, [fetchNextPage, hasNextPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const onLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
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
