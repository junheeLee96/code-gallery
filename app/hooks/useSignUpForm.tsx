"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { User } from "../lib/definitions";
import { useSession } from "next-auth/react";
import { createNewUser } from "../lib/actions";
import { useRouter } from "next/navigation";

const hasWhitespace = /\s/;

export default function useSignUpForm() {
  const { data: session, update } = useSession();
  const router = useRouter();

  const [nickname, setNickname] = useState("");
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNickname(value);
    if (hasWhitespace.test(value)) {
      setError("공백을 포함하지 않아야합니다.");
    } else if (value.length > 8) {
      setError("닉네임은 8자 이하여야합니다.");
    } else {
      setError(null);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (error) return;
    if (!session?.user) return;
    if (nickname === "") {
      setError("1글자 이상이어야합니다.");
      return;
    }
    setIsLoading(true);
    const { user } = session;
    const userInfo: User = {
      uuid: user.id as string,
      email: user.email as string,
      image: user.image as string,
      user_name: user.name as string,
      nickname,
    };
    try {
      await createNewUser(userInfo);
      setIsLoading(true);
      await update({
        ...session,
        user: {
          ...session?.user,
          isNewUser: false,
          nickname,
        },
      });
      router.push("/");
    } catch (e) {
      const message = e instanceof Error ? e.message : "회원가입 실패";
      console.error(message);
      alert("에러가 발생했습니다.");
      setIsLoading(false);
    }
  };

  return { nickname, error, isLoading, onInputChange, handleSubmit };
}
