import { useActionState } from "react";
import { createNewUser } from "../lib/actions";
import { redirect } from "next/navigation";
import { ActionState } from "../lib/definitions";
import { MAX_LENGTH_USER_NICKNAME } from "../lib/length";

const hasWhitespace = /\s/;
export const NicknameMaxLength = 12;

export default function useSignUpForm() {
  async function actionFunc(_: ActionState, formData: FormData) {
    const username = formData.get("username");
    if (typeof username !== "string") {
      return { success: false, message: "새로고침 후 다시 시도해주세요." };
    }

    if (hasWhitespace.test(username)) {
      return { success: false, message: "공백을 포함하지 않아야합니다." };
    }
    if (username.length <= 1 || username.length > MAX_LENGTH_USER_NICKNAME) {
      return {
        success: false,
        message: `닉네임은 2글자 이상, ${MAX_LENGTH_USER_NICKNAME}이하입니다.`,
      };
    }

    const response = await createNewUser(username);
    if (!response.success) {
      return response;
    }

    redirect("/");
  }

  const [signInForm, SignInFormAction] = useActionState(actionFunc, {
    success: false,
    message: null,
  });

  return { signInForm, SignInFormAction };
}
