"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { InfiniteProps } from "../lib/definitions";

type PagedResponse = {
  totalPage: number;
};

type useFetchPostsTypes<T extends PagedResponse> = {
  queryKey: Array<string | Date>;
  queryFn: ({ page, queryKey }: InfiniteProps) => Promise<T>;
};

const useInfiniteQueryHook = <T extends PagedResponse>({
  queryKey,
  queryFn,
}: useFetchPostsTypes<T>) => {
  const { data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      // queryKey = [key, id, Date]
      queryKey,
      queryFn: ({ queryKey, pageParam = 1 }) =>
        queryFn({
          page: pageParam,
          queryKey: queryKey[1] as string,
          date: queryKey[2] as Date,
        }),
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
