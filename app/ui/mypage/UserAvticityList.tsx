"use client";

import useInfiniteQueryHook from "@/app/hooks/useInfiniteQueryHook";
import { getUserActivity } from "@/app/lib/client-data";
import PostSummary from "./PostSummary";
import useScrollLoaer from "@/app/hooks/useScrollLoader";

type UserActivityListProps = {
  activity: string;
};

export default function UserActivityList({ activity }: UserActivityListProps) {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQueryHook({
    queryKey: ["getUserActivity", activity],
    queryFn: getUserActivity,
  });

  useScrollLoaer({ hasNextPage, fetchNextPage });

  return (
    <ul>
      {data &&
        data?.pages.map((page) =>
          page?.data.map((post) => <PostSummary post={post} key={post.idx} />)
        )}
    </ul>
  );
}
