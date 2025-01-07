import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">
        404 - 페이지를 찾을 수 없습니다.
      </h1>
      <p className="mb-4">죄송합니다. 찾을 수 없는 페이지입니다.</p>
      <Link href="/" className="text-blue-500 hover:underline">
        홈으로 돌아가기
      </Link>
    </div>
  );
}
