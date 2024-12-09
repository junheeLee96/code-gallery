"use client";

import { createNewUser } from "@/app/lib/actions";
import { User } from "@/app/lib/definitions";
import { useSession } from "next-auth/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

type SignUpFormTypes = {
  onSuccess: () => void;
  onError: (err: Error) => void;
};
const hasWhitespace = /\s/;

export default function SignUpForm({ onSuccess, onError }: SignUpFormTypes) {
  const { data: session } = useSession();

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
      onSuccess();
    } catch (e) {
      onError(e as Error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h2 className="mb-4 text-2xl font-bold">
        회원가입 완료를 위해 닉네임을 적어주세요.
      </h2>
      <div className="mb-1">
        <label
          htmlFor="nickname"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Nickname
        </label>
        <input
          type="text"
          id="nickname"
          name="nickname"
          value={nickname}
          onChange={onInputChange}
          disabled={isLoading}
          placeholder="Enter your Nickname"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="h-[35px] text-red-500">{error && error}</div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isLoading}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
