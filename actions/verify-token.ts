"use server";

import { isExpired, response } from "@/lib/utils";
import { getUserByEmail, updateUserById } from "@/services/user";
import {
  deleteVerificationTokenById,
  getVerificationTokenByToken,
} from "@/services/verification-token";

export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);
  if (!existingToken) {
    return response({
      success: false,
      error: {
        code: 422,
        message: "Token inválido fornecido.",
      },
    });
  }

  const hasExpired = isExpired(existingToken.expires);
  if (hasExpired) {
    return response({
      success: false,
      error: {
        code: 410,
        message: "Token expirado.",
      },
    });
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser || !existingUser.email) {
    return response({
      success: false,
      error: {
        code: 401,
        message: "Endereço de e-mail não existe.",
      },
    });
  }

  await updateUserById(existingUser.id, {
    emailVerified: new Date(),
    email: existingToken.email,
  });
  await deleteVerificationTokenById(existingToken.id);

  return response({
    success: true,
    code: 200,
    message: "Seu endereço de e-mail foi verificado.",
    data: {
      email: existingUser.email,
    },
  });
};
