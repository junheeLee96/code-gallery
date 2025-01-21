"use client";

import { PostTypes } from "@/app/lib/definitions";
import { formatDateTime } from "@/app/lib/utils";
import { ChevronRight, FolderInput } from "lucide-react";
import { useState } from "react";
import Post from "../common/post/Post";
import { useRouter } from "next/navigation";

type PostSummaryProps = {
  post: PostTypes;
};

export default function PostSummary({ post }: PostSummaryProps) {
  const router = useRouter();
  const [showDetail, setShowDetail] = useState(false);

  return (
    <li
      className="mt-6 cursor-pointer"
      key={post.idx}
      onClick={() => setShowDetail((p) => !p)}
    >
      <div className="flex items-center gap-5 mb-5">
        <div className="text-sm text-gray-500">
          {formatDateTime(JSON.stringify(post.reg_dt))}
        </div>
        <div className="flex-1 flex justify-between overflow-hidden">
          <div>{post.title}</div>
          <div className="cursor-pointer">
            <div className="flex gap-10">
              <FolderInput
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/posts/${post.idx}`);
                }}
              />
              <ChevronRight
                className={`transition-transform duration-200  ${
                  showDetail ? "rotate-90" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </div>
      {showDetail && <Post post={post} isTruncated={false} />}
    </li>
  );
}
