import { Suspense } from "react";
import Feeds from "./ui/home/Feeds";
import NewPost from "./ui/NewPost";
import { auth } from "@/auth";

export default async function Home() {
  // const data = await getPosts("all");
  const session = await auth();

  return (
    <main className="p-2">
      <NewPost />
      <Suspense fallback={"...loading"}>
        <Feeds />
      </Suspense>
    </main>
  );
}
