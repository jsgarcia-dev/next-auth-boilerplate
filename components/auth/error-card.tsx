import { CardWrapper } from "@/components/auth/card-wrapper";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

type ErrorCardProps = {
  message?: AuthError["type"];
};

export const ErrorCard = ({ message }: ErrorCardProps) => {
  let headerDescription =
    "Oops! Algo deu errado. Por favor, entre em contato com o administrador para mais detalhes ou tente novamente mais tarde.";

  if (!message) {
    redirect("/login");
  }

  if (message === "OAuthAccountNotLinked") {
    headerDescription =
      "Outra conta já está registrada com o mesmo endereço de e-mail. Por favor, faça login com a conta diferente.";
  }

  return (
    <CardWrapper
      headerTitle="Ocorreu um Erro"
      headerDescription={headerDescription}
      backButtonLabel="Voltar para o login"
      backButtonHref="/login"
      heroImage="/assets/error.svg"
    >
      <div className="text-center">
        <p className="text-sm text-gray-600 mt-4">
          Código do erro: {message || "Desconhecido"}
        </p>
      </div>
    </CardWrapper>
  );
};
