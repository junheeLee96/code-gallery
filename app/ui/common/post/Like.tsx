"use client";

import { useState } from "react";
import "../css/like.css";
import { handleLike } from "@/app/lib/actions";
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

  const handleResponse = (res: { status: boolean; message: string }) => {
    if (!res.status) {
      if (res.message === "로그인이 필요합니다. 로그인하시겠습니까?") {
        if (confirm(res.message)) {
          router.push("/login");
        } else {
          return false;
        }
      } else {
        alert(res.message);
      }
      return false;
    }

    return true;
  };
  const handleClick = async () => {
    const response = await handleLike(id, !isAnimating);
    if (!handleResponse(response)) return;

    const newLikeCount = !isAnimating ? LikeCount + 1 : LikeCount - 1;
    setLikeCount(newLikeCount);
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
