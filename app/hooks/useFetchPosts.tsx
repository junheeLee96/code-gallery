"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../lib/data";

const useFetchPosts = () => {
  const { data, fetchNextPage, isLoading, hasNextPage } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: async ({ pageParam = 1 }) => await getPosts(pageParam),
    getNextPageParam: (lastPage, pages) => {
      console.log("lastPage, pages = ", lastPage, pages);
      return lastPage.totalPage <= pages.length ? undefined : pages.length + 1;
    },
    initialPageParam: 1,
  });

  return { data, isLoading, hasNextPage, fetchNextPage };
};

export default useFetchPosts;
