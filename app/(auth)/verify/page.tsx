import {
  getVerificationTokenByToken,
  deleteVerificationTokenById,
} from "@/services/verification-token";
import { getUserByEmail, updateUserById } from "@/services/user";
import VerificationSuccess from "@/components/form/verify-token-form";

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
    return <p>Token inválido ou expirado.</p>;
  }

  if (new Date() > verificationToken.expires) {
    await deleteVerificationTokenById(verificationToken.id);
    return <p>Token expirado.</p>;
  }

  const user = await getUserByEmail(verificationToken.email);
  if (user) {
    await updateUserById(user.id, { emailVerified: new Date() });
  }

  await deleteVerificationTokenById(verificationToken.id);

  return <VerificationSuccess />;
}
