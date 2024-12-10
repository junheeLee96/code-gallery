import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getUser } from "./app/lib/data";

export const { handlers, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ profile, user }) {
      const isExistingUser = await getUser(profile?.sub as string);
      if (!isExistingUser) {
        user.isNewUser = true;
      } else {
        user.nickname = isExistingUser.nickname;
      }
      return true;
    },
    async jwt({ token, account, profile, user, trigger, session }) {
      if (account && profile) {
        token.sub = profile.sub as string;
        token.name = profile.name;
        token.email = profile.email;
      }
      if (user) {
        token.isNewUser = user.isNewUser;
        token.nickname = user.nickname;
      }

      if (trigger === "update" && session !== null) {
        console.log("세션 업데이트!!", session);
        return session.user;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.isNewUser = token.isNewUser as boolean;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    newUser: "/sign-up",
  },
});