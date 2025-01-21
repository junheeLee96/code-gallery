import SignUpForm from "../../ui/sign-up/SignUpForm";
import AuthGuard from "@/app/authGuard/\bAuthGuard";

export default function SignUp() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <AuthGuard isSignUp={true}>
        <SignUpForm />
      </AuthGuard>
    </div>
  );
}
