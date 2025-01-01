"use client";

import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { InfiniteQueryResponse } from "../lib/definitions";
import { useEffect } from "react";

type queryFnParams = {
  cursor?: string;
  queryKey: string;
  date: Date;
  sorting: string;
};

interface useInfiniteQueryHookProps<T> {
  queryKey: Array<string | Date>;
  queryFn: ({
    cursor,
    queryKey,
    date,
    sorting,
  }: queryFnParams) => Promise<InfiniteQueryResponse<T>>;
}

const useInfiniteQueryHook = <T,>({
  queryKey,
  queryFn,
}: useInfiniteQueryHookProps<T>) => {
  const {
    data,
    fetchNextPage,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    error,
    isError,
  } = useSuspenseInfiniteQuery({
    queryKey,
    queryFn: ({ queryKey, pageParam = 1 }) => {
      console.log("pageParam = ", pageParam);
      return queryFn({
        cursor: String(pageParam),
        queryKey: queryKey[1] as string,
        date: queryKey[2] as Date,
        sorting: queryKey[3] as string,
      });
    },
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor || undefined;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    if (isError && error) {
      alert(`Error: ${error.message}`);
    }
  }, [error, isError]);

  return {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  };
};

export default useInfiniteQueryHook;
