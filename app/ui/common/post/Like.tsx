"use client";

import { useState } from "react";
import "../css/like.css";
import { handleLike } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import useHandleLike from "@/app/hooks/useHandleLike";

type LikeProps = {
  id: string;
  isInitialLiked: boolean;
  likeCount: number;
};

export default function Like({ id, isInitialLiked, likeCount }: LikeProps) {
  // 애니메이션 관리 상태
  const [isAnimating, setIsAnimating] = useState(isInitialLiked);
  const [LikeCount, setLikeCount] = useState(likeCount);

  const { handleClick } = useHandleLike({
    isLike: isAnimating,
    id,
    onSuccessHandleLike,
  });

  function onSuccessHandleLike() {
    const newLikeCount = !isAnimating ? LikeCount + 1 : LikeCount - 1;
    setLikeCount(newLikeCount);
    setIsAnimating((p) => !p);
  }

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
