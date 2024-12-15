"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { InfiniteProps } from "../lib/definitions";

type PagedResponse = {
  totalPage: number;
};

type useFetchPostsTypes<T extends PagedResponse> = {
  queryKey: string[];
  queryFn: ({ page, queryKey }: InfiniteProps) => Promise<T>;
};

const useInfiniteQueryHook = <T extends PagedResponse>({
  queryKey,
  queryFn,
}: useFetchPostsTypes<T>) => {
  const { data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey,
      queryFn: async ({ queryKey, pageParam = 1 }) =>
        await queryFn({ page: pageParam, queryKey: queryKey[1] }),
      getNextPageParam: (lastPage, pages) => {
        return lastPage.totalPage <= pages.length
          ? undefined
          : pages.length + 1;
      },
      initialPageParam: 1,
    });

  return { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage };
};

export default useInfiniteQueryHook;
