// import { Suspense } from "react";
// import Feeds from "./ui/home/Feeds";
// import FeedSkeleton from "./ui/skeletons/feed/FeedSkeleton";
import Filters from "./ui/home/Filters";

export async function generateMetadata() {
  return {
    title: "codeGallery",
    description: "ekdtlsdml",
  };
}

export default async function Home() {
  //   const date = new Date();
  return (
    <main className="min-h-screen pt-5">
      <Filters />
      {/* <Suspense fallback={<FeedSkeleton />}>
        <Feeds date={date} />
      </Suspense> */}
    </main>
  );
}
