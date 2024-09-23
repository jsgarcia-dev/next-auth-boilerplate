import {
  getVerificationTokenByToken,
  deleteVerificationTokenById,
} from "@/services/verification-token";
import { getUserByEmail, updateUserById } from "@/services/user";
import { NewVerificationForm } from "@/components/form/verify-token-form";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const token = searchParams.token;

  if (!token) {
    return <p>Token inválido.</p>;
  }

  const verificationToken = await getVerificationTokenByToken(token);
  if (!verificationToken) {
    // Token inválido ou expirado
    return <p>Token inválido ou expirado.</p>;
  }

  // Verifica se o token expirou
  if (new Date() > verificationToken.expires) {
    // Exclui o token expirado
    await deleteVerificationTokenById(verificationToken.id);
    return <p>Token expirado.</p>;
  }

  // Atualiza o usuário para marcar o e-mail como verificado
  const user = await getUserByEmail(verificationToken.email);
  if (user) {
    await updateUserById(user.id, { emailVerified: new Date() });
  }

  // Exclui o token de verificação
  await deleteVerificationTokenById(verificationToken.id);

  // Renderiza o formulário de confirmação
  return <NewVerificationForm data={{ success: true }} />;
}
