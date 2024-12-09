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
      const isExistingUser = await getUser(profile.sub);
      if (!isExistingUser) {
        user.isNewUser = true;
      }
      return true;
    },
    async jwt({ token, account, profile, user }) {
      if (account && profile) {
        token.sub = profile.sub;
        token.name = profile.name;
        token.email = profile.email;
      }
      if (user) {
        token.isNewUser = user.isNewUser;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
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
