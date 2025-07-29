import { PrismaClient } from "@prisma/client";
import type { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
 
const prisma = new PrismaClient();

export const authOptions: NextAuthConfig = {
adapter: PrismaAdapter({ client: prisma }),  providers: [],
  callbacks: {
    async session({ session, user }: { session: any, user: any }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
};