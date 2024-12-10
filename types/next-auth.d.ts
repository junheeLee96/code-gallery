import "next-auth";

declare module "next-auth" {
  interface User {
    isNewUser?: boolean;
    nickname?: string;
  }

  interface Session {
    user: User & {
      id: string;
      isNewUser?: boolean;
      nickname?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isNewUser?: boolean;
    nickname?: string;
  }
}
