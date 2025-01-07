"use client";

import { getPost } from "@/app/lib/data";
import Post from "../common/Post";
import Wrapper from "../common/Wrapper";
import { useEffect, useState } from "react";
import { PostTypes } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";

export default function PostWrapper({ post_id }: { post_id: string }) {
  const [post, setPost] = useState<null | PostTypes>(null);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      try {
        const [post] = await getPost(post_id);
        if (post) {
          setPost(post);
        } else {
          // notFound();
        }
      } catch (e) {
        if (e instanceof Error && "statusCode" in e && e.statusCode === 404) {
          console.log("404!!");
          router.push("/404");
        }
      }
    })();
  }, [post_id]);

  return <Wrapper>{post && <Post post={post} isTruncated={false} />}</Wrapper>;
}
