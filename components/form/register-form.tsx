"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { Form } from "@/components/ui/form";
import { registerSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormInput } from "@/components/auth/form-input";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { register } from "@/actions/register";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/store/modal";
import DynamicButton from "@/app/_components/dynamic-button";
import { Lock, Mail } from "lucide-react";

export const RegisterForm = () => {
  const router = useRouter();
  const { setView } = useModalStore();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      register(values).then((data) => {
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
      headerTitle="Registrar"
      headerDescription="Registre sua conta preenchendo o formulário abaixo, certifique-se de que os dados inseridos estão corretos."
      backButtonLabel="Já tem uma conta? Entrar"
      backButtonHref="#"
      onBackButtonClick={() => setView("login")}
    >
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <FormInput
              control={form.control}
              name="name"
              label="Nome"
              type="text"
              placeholder="ex: João Silva"
              isPending={isPending}
            />
            <FormInput
              control={form.control}
              name="email"
              label="Endereço de Email"
              type="email"
              placeholder="ex: johndoe@example.com"
              icon={<Mail className="h-4 w-4 text-muted-foreground" />}
              isPending={isPending}
            />
            <FormInput
              control={form.control}
              name="password"
              label="Senha"
              type="password"
              placeholder="******"
              icon={<Lock className="h-4 w-4 text-muted-foreground" />}
              isPending={isPending}
            />
          </div>
          <DynamicButton
            type="submit"
            text="Criar conta"
            disabled={isPending}
            className="w-full"
          />
        </form>
      </Form>
    </CardWrapper>
  );
};
