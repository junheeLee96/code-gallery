// import getPosts from "./lib/data";
import ExecuteBtn from "./ui/ExecuteBtn";
import NewPost from "./ui/NewPost";

export default async function Home() {
  // const data = await getPosts("all");
  return (
    <div>
      <NewPost />
      {/* <ExecuteBtn /> */}
    </div>
  );
}
