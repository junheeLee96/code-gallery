import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

//프리즈마로 관리

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "database",
  },
  callbacks: {
    // JWT 토큰에 사용자 ID 추가
    async jwt({ token, account, user }) {
      if (account && user) {
        token.id = user.id;
      }
      return token;
    },
    // 세션 객체에 사용자 ID 추가
    async session({ session }) {
      if (session.user) {
        session.user.id = session.user.id;
      }
      return session;
    },
  },
});

// mysql로만 관리

// export const { handlers, auth } = NextAuth({
// providers: [
//   GoogleProvider({
//     clientId: process.env.GOOGLE_CLIENT_ID as string,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//   }),
// ],
//   trustHost: true,
//   callbacks: {
//     async signIn({ profile, user }) {
//       const [isExistingUser] = await getUser(profile?.sub as string);
//       if (!isExistingUser) {
//         user.isNewUser = true;
//       } else {
//         user.nickname = isExistingUser.nickname;
//       }
//       return true;
//     },
//     async jwt({ token, account, profile, user, trigger, session }) {
//       if (account && profile) {
//         token.sub = profile.sub as string;
//         token.name = profile.name;
//         token.email = profile.email;
//       }

//       if (user) {
//         token.isNewUser = user.isNewUser;
//         token.nickname = user.nickname;
//       }

//       if (trigger === "update" && session !== null) {
//         return { ...session.user };
//       }

//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = (token.sub || token.id) as string;
//         session.user.isNewUser = token.isNewUser as boolean;
//         session.user.nickname = token.nickname as string;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//     newUser: "/sign-up",
//   },
// });
