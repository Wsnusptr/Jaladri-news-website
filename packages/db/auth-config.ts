import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import { prisma } from "./index";

// Base auth config for web app (allows all users)
export const baseAuthOptions: Omit<NextAuthConfig, "pages"> = {
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
            name: "credentials",
            async authorize(credentials: Record<string, unknown> | undefined) {
                if (!credentials?.email || !credentials.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                    select: { id: true, email: true, password: true, role: true, name: true }
                });

                if (!user || !user.password) return null;

                const isPasswordValid = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!isPasswordValid) return null;

                return user;
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }: { token: any; user?: any }) {
            if (user) {
                token.id = user.id!;
                token.role = (user as any).role;
            }
            return token;
        },
        session({ session, token }: { session: any; token: any }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
                session.user.role = token.role as Role;
            }
            return session;
        },
    },
    secret: process.env.AUTH_SECRET,
};

// CMS auth config (only allows ADMIN users)
export const cmsAuthOptions: Omit<NextAuthConfig, "pages"> = {
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [
        CredentialsProvider({
            name: "credentials",
            async authorize(credentials: Record<string, unknown> | undefined) {
                if (!credentials?.email || !credentials.password) return null;

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email as string },
                    select: { id: true, email: true, password: true, role: true, name: true }
                });

                if (!user || !user.password) return null;

                // Hanya izinkan login untuk role ADMIN di CMS
                if (user.role !== "ADMIN") {
                    console.log("CMS Login denied: User role is", user.role, "but ADMIN required");
                    return null;
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!isPasswordValid) return null;

                return user;
            },
        }),
    ],
    callbacks: {
        jwt({ token, user }: { token: any; user?: any }) {
            if (user) {
                token.id = user.id!;
                token.role = (user as any).role;
            }
            return token;
        },
        session({ session, token }: { session: any; token: any }) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
                session.user.role = token.role as Role;
            }
            return session;
        },
    },
    secret: process.env.AUTH_SECRET,
};

