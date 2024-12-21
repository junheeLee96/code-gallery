import { Suspense } from "react";
import Feeds from "./ui/home/Feeds";
import NewPost from "./ui/home/NewPost";
import FeedSkeleton from "./ui/skeletons/feed/FeedSkeleton";

export default async function Home() {
  const date = new Date();
  return (
    <main className="p-2">
      <NewPost />
      <Suspense fallback={<FeedSkeleton />}>
        <Feeds date={date} />
      </Suspense>
    </main>
  );
}
