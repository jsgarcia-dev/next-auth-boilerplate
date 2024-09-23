"use server";

import { z } from "zod";

import { registerSchema } from "@/schemas";
import { createUser, getUserByEmail } from "@/services/user";
import { hashPassword, response } from "@/lib/utils";
import { createVerificationToken } from "@/services/verification-token";
import { sendVerificationEmail } from "@/services/mail";

export const register = async (payload: z.infer<typeof registerSchema>) => {
  let user;

  const validatedFields = registerSchema.safeParse(payload);
  if (!validatedFields.success) {
    return response({
      success: false,
      error: {
        code: 422,
        message: "Campos inválidos.",
      },
    });
  }
  const { name, email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return response({
      success: false,
      error: {
        code: 422,
        message: "Endereço de e-mail já existe. Por favor, use outro.",
      },
    });
  }

  try {
    const hashedPassword = await hashPassword(password);

    user = await createUser({
      name,
      email,
      password: hashedPassword,
    });

    if (!user) {
      return response({
        success: false,
        error: {
          code: 500,
          message: "Não foi possível criar o usuário.",
        },
      });
    }

    const verificationToken = await createVerificationToken(
      user.email as string
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return response({
      success: true,
      code: 201,
      message:
        "Conta criada com sucesso. Por favor, verifique seu e-mail para ativar a conta.",
    });
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return response({
      success: false,
      error: {
        code: 500,
        message: "Ocorreu um erro ao criar sua conta.",
      },
    });
  }
};
