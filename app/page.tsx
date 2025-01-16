import { Suspense } from "react";
import Feeds from "./ui/home/Feeds";
import FeedSkeleton from "./ui/skeletons/feed/FeedSkeleton";
import Filters from "./ui/home/Filters";
import { auth } from "@/auth";

export default async function Home() {
  const date = new Date();
  const session = await auth();
  console.log(session);
  return (
    <main className="min-h-screen pt-5">
      <Filters />
      {/* <Suspense fallback={<FeedSkeleton />}>
        <Feeds date={date} />
      </Suspense> */}
    </main>
  );
}
