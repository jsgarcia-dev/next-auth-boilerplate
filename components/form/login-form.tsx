"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { login } from "@/actions/login";
import { FormInput } from "@/components/auth/form-input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useModalStore } from "@/store/modal";
import { Social } from "@/components/auth/social";
import DynamicButton from "@/app/_components/dynamic-button";
import { Mail, Lock } from "lucide-react";

export const LoginForm = () => {
  const router = useRouter();
  const { setView } = useModalStore();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      login(values)
        .then((data) => {
          if (!data) return;
          if (!data.success) {
            return toast.error(data.error.message);
          }
          return router.push("/two-factor");
        })
        .catch(() => toast.error("Algo deu errado."));
    });
  });

  return (
    <CardWrapper
      headerTitle="Conecte-se"
      headerDescription="Preencha os campos abaixo para acessar sua conta."
      backButtonLabel="Não tem uma conta? Registre-se"
      onBackButtonClick={() => setView("register")}
    >
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <FormInput
              control={form.control}
              name="email"
              label="Endereço de Email"
              type="email"
              placeholder="ex: johndoe@example.com"
              icon={<Mail className="h-4 w-4 text-muted-foreground" />}
              isPending={isPending}
            />
            <div className="relative flex w-full items-baseline">
              <FormInput
                control={form.control}
                name="password"
                label="Senha"
                type="password"
                placeholder="******"
                icon={<Lock className="h-4 w-4 text-muted-foreground" />}
                className="min-w-[400px]"
                isPending={isPending}
              />
              <Button
                size="sm"
                variant="link"
                className="-mt-6 p-0 text-xs text-black w-full justify-end underline absolute top-5"
                onClick={() => setView("reset")}
                type="button"
              >
                Esqueceu a senha?
              </Button>
            </div>
          </div>
          <DynamicButton
            type="submit"
            text="Conecte-se"
            disabled={isPending}
            className="w-full"
          />
        </form>
      </Form>

      <div className="mt-6">
        <div className="flex items-center mb-4">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-4 text-gray-500">ou</span>
          <hr className="flex-1 border-gray-300" />
        </div>
        <Social />
        <hr className="flex-1 border-gray-200 mt-4" />
      </div>
    </CardWrapper>
  );
};
