"use client";

import { getPost } from "@/app/lib/data";
import Post from "../common/Post";
import Wrapper from "../common/Wrapper";
import { useEffect, useState } from "react";
import { PostTypes } from "@/app/lib/definitions";

export default function PostWrapper({ post_id }: { post_id: string }) {
  const [post, setPost] = useState<null | PostTypes>(null);

  useEffect(() => {
    (async () => {
      const post = await getPost(post_id);
      console.log("post  =", post);
      if (post.length > 0) {
        setPost(post[0]);
      }
    })();
  }, []);

  return <Wrapper>{post && <Post post={post} />}</Wrapper>;
}
