"use client";

import Button from "../common/Button";
import useSignUpForm from "@/app/hooks/useSignUpForm";

export default function SignUpForm() {
  const { nickname, error, isLoading, onInputChange, handleSubmit } =
    useSignUpForm();

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
        <Button type="submit" disabled={isLoading}>
          가입하기
        </Button>
      </div>
    </form>
  );
}
