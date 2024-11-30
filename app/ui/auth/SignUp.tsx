export default function SignUp() {
  const onSignUp = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000/oauth/google&scope=email profile`;
    // window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&response_type=token&redirect_uri=http://localhost:3000/oauth/google&scope=https://www.googleapis.com/auth/userinfo.email`;
  };
  return (
    <span
      onClick={onSignUp}
      className="inline-block border-r border-t border-b boder-1 rounded-sign-up-shape  px-5 py-1 hover:bg-btn-hover-background hover:text-btn-hover-text"
    >
      UP
    </span>
  );
}
