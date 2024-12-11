"use client";

import { useCallback, useEffect } from "react";
import Post from "../Post";
import { PostTypes } from "@/app/lib/definitions";
import useFetchPosts from "@/app/hooks/useFetchPosts";

export default function Feeds() {
  const { data, hasNextPage, fetchNextPage, isLoading } = useFetchPosts();

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

  //todo: isLoading인 경우 스켈레톤
  return (
    <div>
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex}>
          {page.posts.map((post: PostTypes, idx: number) => (
            <div key={post.idx || idx} className="mt-4 bg-red-500">
              <div>{post.idx}</div>
              <Post post={post} />
            </div>
          ))}
        </div>
      ))}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Load More
        </button>
      )}
    </div>
  );
}
