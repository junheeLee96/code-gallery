"use client";

import { useState } from "react";
import "./css/like.css";
import { createLike } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

type LikeProps = {
  id: string;
  isInitialLiked: boolean;
  likeCount: number;
};

export default function Like({ id, isInitialLiked, likeCount }: LikeProps) {
  const router = useRouter();
  const [isAnimating, setIsAnimating] = useState(isInitialLiked);
  const [LikeCount, setLikeCount] = useState(likeCount);
  const handleClick = async () => {
    // if (isAnimating) return;

    const response = await createLike(id, !isAnimating);
    if (response.message) {
      if (window.confirm(response?.message)) {
        router.push("/login");
        return;
      }
    }
    if (!isAnimating) {
      setLikeCount((p) => p + 1);
    } else {
      setLikeCount((p) => p - 1);
    }
    setIsAnimating((p) => !p);
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
