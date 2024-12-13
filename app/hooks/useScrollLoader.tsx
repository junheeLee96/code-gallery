"use client";

import { useCallback, useEffect } from "react";

type useScrollLoaerProps = {
  fetchNextPage: () => void;
  hasNextPage: boolean;
};

export default function useScrollLoaer({
  fetchNextPage,
  hasNextPage,
}: useScrollLoaerProps) {
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      !hasNextPage
    ) {
      return;
    }
    fetchNextPage();
  }, [fetchNextPage, hasNextPage]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
}
