"use client";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { resendSchema } from "@/schemas";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { FormInput } from "@/components/auth/form-input";
import { useTransition } from "react";
import { resendToken } from "@/actions/resend";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useModalStore } from "@/store/modal";
import DynamicButton from "@/app/_components/dynamic-button";
import { Mail } from "lucide-react";

export const ResendForm = () => {
  const { setView } = useModalStore();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof resendSchema>>({
    resolver: zodResolver(resendSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(() => {
      resendToken(values).then((data) => {
        if (data.success) {
          toast.success(data.message);
          setView("login");
        } else {
          toast.error(data.error.message);
        }
      });
    });
  });

  return (
    <CardWrapper
      headerTitle="Reenviar Confirmação"
      headerDescription="O link de verificação expirará após uma hora. Se você não verificar seu e-mail dentro de uma hora, você pode solicitar outro link de verificação por e-mail."
      backButtonLabel="Voltar para o login"
      onBackButtonClick={() => setView("login")}
    >
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            control={form.control}
            name="email"
            label="Email Address"
            type="email"
            placeholder="e.g. johndoe@example.com"
            icon={<Mail className="h-4 w-4 text-muted-foreground" />}
            isPending={isPending}
          />
          <DynamicButton
            type="submit"
            text="Enviar link de confirmação"
            disabled={isPending}
            className="w-full"
          />
        </form>
      </Form>
    </CardWrapper>
  );
};
