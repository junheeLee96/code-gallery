import "next-auth";

declare module "next-auth" {
  interface User {
    isNewUser?: boolean;
  }

  interface Session {
    user: User & {
      isNewUser?: boolean;
    };
  }

  interface JWT {
    sub?: string;
    name?: string;
    email?: string;
    isNewUser?: boolean;
  }
}
