"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { InfiniteQueryResponse } from "../lib/definitions";
import { useEffect } from "react";

export type queryFnParams = {
  cursor: string;
  queryKey: string;
  date: Date;
  sorting: string;
  timePeriod: string;
};

interface useInfiniteQueryHookProps<T> {
  queryKey: Array<string | Date | number>;
  queryFn: ({
    cursor,
    queryKey,
    date,
    sorting,
    timePeriod,
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
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ queryKey, pageParam = "1" }) => {
      return queryFn({
        cursor: pageParam,
        queryKey: queryKey[1] as string,
        date: queryKey[2] as Date,
        sorting: queryKey[3] as string,
        timePeriod: (queryKey[4] as string) || "",
      });
    },
    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor || undefined;
    },
    initialPageParam: "1",
  });

  useEffect(() => {
    if (isError && error) {
      console.error(`Error: ${error.message}`);
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
