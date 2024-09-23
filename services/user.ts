import { db } from "@/lib/db";
import { registerSchema } from "@/schemas";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { createVerificationToken } from "./verification-token";
import { sendVerificationEmail } from "./mail";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });

    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } });

    return user;
  } catch {
    return null;
  }
};

export const createUser = async (payload: z.infer<typeof registerSchema>) => {
  try {
    const user = await db.user.create({
      data: payload,
    });

    // Gera o token de verificação e envia o e-mail
    const verificationToken = await createVerificationToken(
      user.email as string
    );
    await sendVerificationEmail(user.email as string, verificationToken.token);

    return user;
  } catch {
    return null;
  }
};

type UpdateUserType = Prisma.Args<typeof db.user, "update">["data"];
export const updateUserById = async (id: string, payload: UpdateUserType) => {
  try {
    return await db.user.update({
      where: { id },
      data: payload,
    });
  } catch {
    return null;
  }
};
