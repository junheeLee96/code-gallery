"use client";

import useInfiniteQueryHook from "@/app/hooks/useInfiniteQueryHook";
import { getUserActivity } from "@/app/lib/client-data";
import { dateTimeToKoreanFormat, formatDateTime } from "@/app/lib/utils";
import PostSummary from "./PostSummary";

type UserActivityListProps = {
  activity: string;
};

export default function UserActivityList({ activity }: UserActivityListProps) {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQueryHook({
    queryKey: ["getUserActivity", activity],
    queryFn: getUserActivity,
  });

  console.log(data);
  return (
    <ul>
      {data &&
        data?.pages.map((page) =>
          page?.data.map((post) => <PostSummary post={post} key={post.idx} />)
        )}
    </ul>
  );
}
