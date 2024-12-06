// import getPosts from "./lib/data";
import { useSession } from "next-auth/react";
import ExecuteBtn from "./ui/ExecuteBtn";
import NewPost from "./ui/NewPost";
import { auth } from "@/auth";

export default async function Home() {
  // const data = await getPosts("all");
  const session = await auth();
  console.log(session);

  return (
    <main className="p-2">
      <NewPost />
      {/* <ExecuteBtn /> */}
    </main>
  );
}
