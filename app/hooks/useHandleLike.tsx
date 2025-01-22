"use client";

import { handleLike } from "../lib/actions";
import { useRouter } from "next/navigation";

type useHandleLikeProps = {
  isLike: boolean;
  id: string;
  onSuccessHandleLike: () => void;
};

export default function useHandleLike({
  isLike,
  id,
  onSuccessHandleLike,
}: useHandleLikeProps) {
  // 비동기 통신 훅스
  const router = useRouter();

  const handleResponse = (res: { status: boolean; message: string }) => {
    if (!res.status) {
      if (res.message === "로그인이 필요합니다. 로그인하시겠습니까?") {
        if (confirm(res.message)) {
          router.push("/login");
        } else {
          return false;
        }
      }
      alert(res.message);
      return false;
    }

    return true;
  };

  const handleClick = async () => {
    const response = await handleLike(id, !isLike);
    if (!handleResponse(response)) return;

    onSuccessHandleLike();
  };

  return { handleClick };
}
