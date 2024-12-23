"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { InfiniteQueryResponse } from "../lib/definitions";

type queryFnParams = {
  page: number;
  queryKey: string;
  date: Date;
};

interface useInfiniteQueryHookProps<T> {
  queryKey: Array<string | Date>;
  queryFn: ({
    page,
    queryKey,
    date,
  }: queryFnParams) => Promise<InfiniteQueryResponse<T>>;
}

const useInfiniteQueryHook = <T,>({
  queryKey,
  queryFn,
}: useInfiniteQueryHookProps<T>) => {
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
