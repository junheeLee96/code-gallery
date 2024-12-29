"use client";

import { useState } from "react";
import "./css/like.css";

type LikeProps = {
  id: number;
  isInitialLiked?: boolean;
};

export default function Like({ id, isInitialLiked }: LikeProps) {
  const [isAnimating, setIsAnimating] = useState(
    isInitialLiked ? isInitialLiked : false
  );
  const handleClick = async () => {
    if (isAnimating) return;
    const response = await setIsAnimating(true);
  };

  return (
    <div
      className={`heart ${isAnimating ? "is_animating" : ""} bg-${
        isAnimating ? "right" : "left"
      }`}
      onClick={handleClick}
    />
  );
}
