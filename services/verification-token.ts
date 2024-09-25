import { db } from "@/lib/db";
import { setTokenExpiration } from "@/lib/utils";
import { v4 as uuid } from "uuid";

export const createVerificationToken = async (email: string) => {
  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken && new Date() < existingToken.expires) {
    return existingToken;
  } else if (existingToken) {
    await deleteVerificationTokenById(existingToken.id);
  }

  const token = uuid();
  const expires = setTokenExpiration();

  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  return verificationToken;
};

export const generateVerificationToken = async (email: string) => {
  const existingToken = await getVerificationTokenByEmail(email);
  if (existingToken) {
    await deleteVerificationTokenById(existingToken.id);
  }

  return createVerificationToken(email);
};

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch (error) {
    console.error("Erro ao buscar o token de verificação:", error);
    return null;
  }
};

export const getVerificationToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch (error) {
    console.error("Erro ao buscar o token de verificação:", error);
    return null;
  }
};

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch (error) {
    console.error("Erro ao buscar o token de verificação por e-mail:", error);
    return null;
  }
};

export const deleteVerificationTokenById = async (id: string) => {
  try {
    return await db.verificationToken.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Erro ao deletar o token de verificação:", error);
    return null;
  }
};
