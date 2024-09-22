import NextAuth from "next-auth";
import { authConfig } from "@/auth/config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserById, updateUserById } from "@/services/user";
import { getAccountByUserId } from "@/services/account";
import { isExpired } from "@/lib/utils";
import { getTwoFactorConfirmationByUserId } from "@/services/two-factor-confirmation";
import { UserRole } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24, // 1 Dia
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  events: {
    async linkAccount({ user }) {
      await updateUserById(user.id as string, { emailVerified: new Date() });
    },
  },
  callbacks: {
    async jwt({ token, trigger, session }) {
      if (!token.sub) return token;

      if (trigger === "update" && session?.user) {
        const updatedUser = await getUserById(token.sub);
        if (updatedUser) {
          token.name = updatedUser.name;
          token.email = updatedUser.email;
          token.role = updatedUser.role;
          token.isTwoFactorEnabled = updatedUser.isTwoFactorEnabled;
          token.isOAuth = !!(await getAccountByUserId(updatedUser.id));
        }
      } else {
        const existingUser = await getUserById(token.sub);
        if (existingUser) {
          token.name = existingUser.name;
          token.email = existingUser.email;
          token.role = existingUser.role;
          token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;
          token.isOAuth = !!(await getAccountByUserId(existingUser.id));
        }
      }

      return token;
    },
    async session({ token, session }) {
      if (session.user && token) {
        session.user.id = token.sub || "";
        session.user.name = token.name || "";
        session.user.email = token.email || "";
        session.user.role = (token.role as UserRole) || "USER";
        session.user.isTwoFactorEnabled =
          (token.isTwoFactorEnabled as boolean) ?? false;
        session.user.isOAuth = (token.isOAuth as boolean) ?? false;
      }

      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id as string);
      if (!existingUser?.emailVerified) return false;

      if (existingUser.isTwoFactorEnabled) {
        const existingTwoFactorConfirmation =
          await getTwoFactorConfirmationByUserId(existingUser.id);
        if (!existingTwoFactorConfirmation) return false;
        const hasExpired = isExpired(existingTwoFactorConfirmation.expires);
        if (hasExpired) return false;
      }

      return true;
    },
  },
  ...authConfig,
});
