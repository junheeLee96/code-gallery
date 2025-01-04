"use client";

import { useState } from "react";
import "./css/like.css";
import { createLike } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import { ResultSetHeader } from "mysql2";

type LikeProps = {
  id: string;
  isInitialLiked: boolean;
  likeCount: number;
};

function isErrorResponse(
  response: ResultSetHeader[] | { message: string }
): response is { message: string } {
  return "message" in response;
}

export default function Like({ id, isInitialLiked, likeCount }: LikeProps) {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(isInitialLiked);
  const [LikeCount, setLikeCount] = useState(likeCount);

  const handleClick = async () => {
    const response = await createLike(id, !isAnimating);

    if (isErrorResponse(response)) {
      if (window.confirm(response.message)) {
        router.push("/login");
        return;
      }
    } else {
      if (!isAnimating) {
        setLikeCount((p) => p + 1);
      } else {
        setLikeCount((p) => p - 1);
      }
      setIsAnimating((p) => !p);
    }
  };

  return (
    <div className="flex items-center justify-end">
      <div
        className={`heart ${isAnimating ? "is_animating" : ""} bg-${
          isAnimating ? "right" : "left"
        }`}
        onClick={handleClick}
      />
      <span>{LikeCount}</span>
    </div>
  );
}
