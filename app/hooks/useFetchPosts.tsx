"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getPosts } from "../lib/data";
import { LanguageType } from "../stores/types/language-store-type";

type useFetchPostsTypes = {
  language: LanguageType;
  queryKey: string[];
};

const useFetchPosts = ({ language, queryKey }: useFetchPostsTypes) => {
  const { data, fetchNextPage, isLoading, hasNextPage } = useInfiniteQuery({
    queryKey,
    queryFn: async ({ queryKey, pageParam = 1 }) =>
      await getPosts({
        page: pageParam,
        queryKey: queryKey[1],
      }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage.totalPage <= pages.length ? undefined : pages.length + 1;
    },
    initialPageParam: 1,
  });

  return { data, isLoading, hasNextPage, fetchNextPage };
};

export default useFetchPosts;
