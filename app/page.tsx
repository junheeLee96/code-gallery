import Feeds from "./ui/home/Feeds";
import NewPost from "./ui/NewPost";

export default async function Home() {
  return (
    <main className="p-2">
      <NewPost />
      <Feeds />
    </main>
  );
}
