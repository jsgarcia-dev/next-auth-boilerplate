"use server";

import { profileSchema } from "@/schemas";
import { z } from "zod";
import { currentUser } from "@/lib/auth";
import { hashPassword, response } from "@/lib/utils";
import { getUserByEmail, getUserById, updateUserById } from "@/services/user";
import { deleteTwoFactorConfirmationByUserId } from "@/services/two-factor-confirmation";
import bcrypt from "bcryptjs";
import { generateVerificationToken } from "@/services/verification-token";
import { sendVerificationEmail } from "@/services/mail";

export const profile = async (payload: z.infer<typeof profileSchema>) => {
  // Verifica se os dados de entrada do usuário são válidos.
  const validatedFields = profileSchema.safeParse(payload);
  if (!validatedFields.success) {
    return response({
      success: false,
      error: {
        code: 422,
        message: "Campos inválidos.",
      },
    });
  }

  let { name, email, password, newPassword, isTwoFactorEnabled } =
    validatedFields.data;

  // Verifica se o usuário atual existe. Caso contrário, retorna um erro.
  const user = await currentUser();
  if (!user) {
    return response({
      success: false,
      error: {
        code: 401,
        message: "Não autorizado.",
      },
    });
  }

  // Verifica se o usuário existe no banco de dados. Caso contrário, retorna um erro.
  const existingUser = await getUserById(user.id as string);
  if (!existingUser) {
    return response({
      success: false,
      error: {
        code: 401,
        message: "Não autorizado.",
      },
    });
  }

  // Impede a atualização de certos campos se o usuário estiver logado via OAuth.
  if (user.isOAuth) {
    email = undefined;
    password = undefined;
    newPassword = undefined;
    isTwoFactorEnabled = undefined;
  }

  // Verifica se o usuário está tentando atualizar o endereço de e-mail
  if (email && email !== user.email) {
    // Verifica se o e-mail já está em uso por outro usuário
    const existingEmail = await getUserByEmail(email);
    if (existingEmail && user.id !== existingEmail.id) {
      return response({
        success: false,
        error: {
          code: 422,
          message:
            "O endereço de e-mail inserido já está em uso. Por favor, use outro.",
        },
      });
    }

    // Gera um token de verificação e envia para o novo e-mail
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    // Retorna uma resposta de sucesso
    return response({
      success: true,
      code: 201,
      message:
        "E-mail de confirmação enviado. Por favor, verifique seu e-mail.",
    });
  }

  // Se a senha não for fornecida, não atualiza a senha
  if (!password || !newPassword) {
    password = undefined;
  }

  // Se a senha for fornecida, verifica e atualiza
  if (password && newPassword && existingUser.password) {
    // Verifica se a senha atual está correta
    const isPasswordMatch = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordMatch) {
      return response({
        success: false,
        error: {
          code: 401,
          message: "Senha incorreta.",
        },
      });
    }

    const hashedPassword = await hashPassword(newPassword);
    password = hashedPassword;
  }

  // Se o usuário desativou o 2FA, exclui a confirmação de dois fatores
  if (!isTwoFactorEnabled) {
    await deleteTwoFactorConfirmationByUserId(existingUser.id);
  }

  // Atualiza o usuário atual
  const updatedUser = await updateUserById(existingUser.id, {
    name,
    email,
    password,
    isTwoFactorEnabled,
  });

  // Retorna uma resposta de sucesso
  return response({
    success: true,
    code: 204,
    message: "Perfil atualizado.",
  });
};
