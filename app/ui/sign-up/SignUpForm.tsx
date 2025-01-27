"use client";

import Button from "../common/Button";
import useSignUpForm from "@/app/hooks/useSignUpForm";
import Wrapper from "../common/Wrapper";
import Input from "../common/input";
import { MAX_LENGTH_USER_NICKNAME } from "@/app/lib/length";

export default function SignUpForm() {
  const { signInForm, SignInFormAction } = useSignUpForm();
  console.log(signInForm);

  return (
    <Wrapper className="max-w-[500px]">
      <form action={SignInFormAction}>
        <h2 className="mb-4 text-2xl font-bold">
          회원가입 완료를 위해 닉네임을 적어주세요.
        </h2>
        <div className="mb-1">
          <Input
            id="username"
            name="username"
            label="아이디를 입력해주세요"
            maxLength={MAX_LENGTH_USER_NICKNAME}
            placeholder=""
          />
        </div>

        <div className="flex items-center justify-between">
          <Button type="submit">가입하기</Button>
        </div>
        <p className="mt-2 text-red-500">{signInForm.message}</p>
      </form>
    </Wrapper>
  );
}
