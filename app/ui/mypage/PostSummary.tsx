"use client";

import { PostTypes } from "@/app/lib/definitions";
import { formatDateTime } from "@/app/lib/utils";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

type PostSummaryProps = {
  post: PostTypes;
};

export default function PostSummary({ post }: PostSummaryProps) {
  const [showDetail, setShowDetail] = useState(false);
  useEffect(() => {
    console.log(showDetail);
  }, [showDetail]);
  return (
    <li className="mt-3 bg-red-500 " key={post.idx}>
      <div className="flex items-center gap-5">
        <div className="text-sm">
          {formatDateTime(JSON.stringify(post.reg_dt))}
        </div>
        <div className="flex-1 bg-blue-500 flex justify-between overflow-hidden">
          <div>{post.title}</div>
          <div
            className={`cursor-pointer transition-transform duration-200 ${
              showDetail ? "rotate-90" : ""
            }`}
            onClick={() => setShowDetail((p) => !p)}
          >
            <ChevronRight />
          </div>
        </div>
      </div>
    </li>
  );
}
