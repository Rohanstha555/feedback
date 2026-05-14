import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    _id?: string;
    username?: string;
    isVerified?: boolean;
    isAcceptMsg?: boolean;
  }

  interface Session {
    user: {
      _id?: string;
      username?: string;
      isVerified?: boolean;
      isAcceptMsg?: boolean;
    } & DefaultSession["user"];
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    _id?: string;
    username?: string;
    isVerified?: boolean;
    isAcceptMsg?: boolean;
  }
}
