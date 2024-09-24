import { CardWrapper } from "@/components/auth/card-wrapper";
import type { Response } from "@/types";
import { redirect } from "next/navigation";

type NewVerificationFormProps = {
  data: { success: boolean };
};

export const NewVerificationForm = ({ data }: NewVerificationFormProps) => {
  if (!data.success) {
    return redirect("/login");
  }

  return (
    <CardWrapper
      headerTitle="Endereço de E-mail Verificado!"
      headerDescription="Parabéns! Você verificou seu endereço de e-mail com sucesso. Agora você pode usar sua conta para fazer login no site."
      backButtonLabel="Voltar para o login"
      backButtonHref="/login"
      heroImage="/assets/email-verified.svg"
    >
      <div className="text-center">
        <p className="text-sm text-gray-600 mt-4">
          Sua conta agora está totalmente ativada e pronta para uso.
        </p>
      </div>
    </CardWrapper>
  );
};
