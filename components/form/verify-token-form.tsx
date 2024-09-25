"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { useRouter } from "next/navigation";
import DynamicButton from "@/app/_components/dynamic-button";

export default function VerificationSuccess() {
  const router = useRouter();

  const handleBackToSite = () => {
    router.push("/");
  };

  return (
    <CardWrapper
      headerTitle="Endereço de E-mail Verificado!"
      headerDescription="Parabéns! Você verificou seu endereço de e-mail com sucesso."
      heroImage="/assets/email-verified.svg"
    >
      <div className="text-center">
        <p className="text-sm text-gray-600 mt-4">
          Sua conta agora está totalmente ativada. Por favor, faça login para
          continuar.
        </p>
        <DynamicButton
          onClick={handleBackToSite}
          text="Voltar para o Site"
          className="mt-4"
        />
      </div>
    </CardWrapper>
  );
}
