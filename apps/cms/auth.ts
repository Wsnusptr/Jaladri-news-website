// apps/cms/auth.ts
import NextAuth from "next-auth"
import { baseAuthOptions } from "./auth-config"
import type { NextAuthConfig } from "next-auth"

const authOptions = {
  ...baseAuthOptions,
  pages: { 
    signIn: "/login",
    error: "/unauthorized" 
  },
} as NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)
export { authOptions }
