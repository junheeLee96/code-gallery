import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getUser } from "./app/lib/data";
import { createNewUser } from "./app/lib/actions";
import { User } from "./app/lib/definitions";

export const { handlers, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || ("" as string),
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ("" as string),
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      console.log("token = ", token);
      console.log("account = ", account);
      if (account) {
        // 첫 로그인
        if (token) {
          const user: User = {
            uuid: token.sub!,
            user_name: token.name!,
            email: token.email!,
            image: token.picture!,
          };
          const res = await createNewUser(user);
          console.log(res);
        }
        return {
          ...token,
          access_token: account.access_token,
          expires_at: account.expires_at,
          refresh_token: account.refresh_token,
        };
      } else if (
        typeof token.expires_at === "number" &&
        Date.now() < token.expires_at * 1000
      ) {
        // 유효한 토큰
        return token;
      } else {
        // 만료된 톸ㄴ
        if (!token.refresh_token && typeof token.refresh !== "string")
          throw new TypeError("Missing refresh_token");

        try {
          const response = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            body: new URLSearchParams({
              client_id: process.env.GOOGLE_CLIENT_ID!,
              client_secret: process.env.GOOGLE_CLIENT_SECRET!,
              grant_type: "refresh_token",
              refresh_token: token.refresh_token as string,
            }),
          });

          const tokensOrError = await response.json();

          if (!response.ok) throw tokensOrError;

          const newTokens = tokensOrError as {
            access_token: string;
            expires_in: number;
            refresh_token?: string;
          };

          token.access_token = newTokens.access_token;
          token.expires_at = Math.floor(
            Date.now() / 1000 + newTokens.expires_in
          );

          if (newTokens.refresh_token)
            // 리프레쉬 토큰이 재발급이 안된경우(provider에 따라 리프레시 토큰이 최초 한번만 발급될수잇음)
            token.refresh_token = newTokens.refresh_token;
          return token;
        } catch (error) {
          console.error("Error refreshing access_token", error);

          token.error = "RefreshTokenError";
          return token;
        }
      }
    },
    async session({ session, token }) {
      session.user.id = token.sub as string;
      return session;
    },
  },
});
