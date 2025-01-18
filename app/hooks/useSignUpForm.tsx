"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { createNewUser } from "../lib/actions";
import { useRouter } from "next/router";

const hasWhitespace = /\s/;
const NicknameMaxLength = 12;

export default function useSignUpForm() {
  const router = useRouter();

  const { data: session } = useSession();

  const [nickname, setNickname] = useState("");
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNickname(value);
    if (hasWhitespace.test(value)) {
      setError("공백을 포함하지 않아야합니다.");
    } else if (value.length > NicknameMaxLength) {
      setError(`닉네임은 ${NicknameMaxLength}자 이하여야합니다.`);
    } else {
      setError(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (error || !session?.user) return;
    if (nickname === "") {
      setError("1글자 이상이어야합니다.");
      return;
    }
    setIsLoading(true);
    try {
      await createNewUser(nickname);
      router.push("/");
    } catch (e) {
      console.error(e);
      setError(
        e instanceof Error ? e.message : "알 수 없는 오류가 발생했습니다."
      );
    }
  };

  return { nickname, error, isLoading, onInputChange, handleSubmit };
}
