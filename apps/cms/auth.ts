// apps/cms/auth.ts
import NextAuth from "next-auth"
import authConfig from './auth-config';
import type { NextAuthConfig } from "next-auth"

const authOptions = {
  ...authConfig,
  pages: {
    signIn: "/login",
    error: "/unauthorized"
  },
} as NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
export { authOptions }
