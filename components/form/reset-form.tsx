"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/auth/form-input";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { resetPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { resetPassword } from "@/actions/reset-password";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/store/modal";

export const ResetForm = () => {
  const router = useRouter();
  const { setView } = useModalStore();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      resetPassword(values).then((data) => {
        if (data.success) {
          router.push("/login");
          return toast.success(data.message);
        }
        return toast.error(data.error.message);
      });
    });
  });

  return (
    <CardWrapper
      headerTitle="Esqueceu a Senha"
      headerDescription="Por favor, insira seu endereço de e-mail. Você receberá uma mensagem com instruções para redefinir sua senha."
      backButtonLabel="Voltar ao Login"
      backButtonHref="#"
      onBackButtonClick={() => setView("login")}
    >
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            control={form.control}
            name="email"
            label="Endereço de Email"
            type="email"
            placeholder="ex: johndoe@example.com"
            isPending={isPending}
          />
          <Button type="submit" disabled={isPending} className="w-full">
            Enviar link de redefinição
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
