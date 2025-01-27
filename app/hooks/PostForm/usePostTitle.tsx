import { TITLE_MAX_LENGTH } from "@/app/lib/length";
import { ChangeEvent, useState } from "react";

type usePostTitleProps = {
  InitialTitle: string;
};

export default function usePostTitle({ InitialTitle = "" }: usePostTitleProps) {
  const [title, setTitle] = useState(InitialTitle);
  const [TitleError, setTitleError] = useState<null | string>(null);

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (TITLE_MAX_LENGTH < value.length) {
      setTitleError(`제목은 ${TITLE_MAX_LENGTH}자 이하여야합니다.`);
    } else {
      setTitleError(null);
    }
    setTitle(value);
  };

  return { title, TitleError, handleTitle };
}
