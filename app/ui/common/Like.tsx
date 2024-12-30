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
  const handleClick = async () => {
    if (isAnimating) return;
    const response = await createLike(id);
    console.log(response);
    if (response.message) {
      if (window.confirm(response?.message)) {
        router.push("/login");
        return;
      }
    }
    setIsAnimating(true);
  };

  return (
    <div className="flex items-center">
      <div
        className={`heart ${isAnimating ? "is_animating" : ""} bg-${
          isAnimating ? "right" : "left"
        }`}
        onClick={handleClick}
      />
      <span>{likeCount}</span>
    </div>
  );
}
