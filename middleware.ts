// import { NextResponse } from "next/server";
// import { auth } from "./auth";

// export default auth((req) => {
//   const isLoggedIn = !!req.auth;
//   const PostPage = req.nextUrl.pathname.startsWith("/post");
//   const MyPage = req.nextUrl.pathname.startsWith("/mypage");
//   if ((PostPage || MyPage) && !isLoggedIn) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }
// });

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|.*\\.png$).*)"],
// };
// // export const config = {
// //   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// // };
