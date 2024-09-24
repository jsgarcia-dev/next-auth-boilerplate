"use client";

import { Dialog } from "./dialog";
import { useModalStore } from "@/store/modal";
import { LoginForm } from "@/components/form/login-form";
import { RegisterForm } from "@/components/form/register-form";
import { ResetForm } from "@/components/form/reset-form";
import { ResendForm } from "@/components/form/resend-form";

export const AuthModal = () => {
  const { isOpen, closeModal, view } = useModalStore();

  let content;
  if (view === "login") {
    content = <LoginForm />;
  } else if (view === "register") {
    content = <RegisterForm />;
  } else if (view === "reset") {
    content = <ResetForm />;
  } else if (view === "resend") {
    content = <ResendForm />;
  }

  return (
    <Dialog isOpen={isOpen} onClose={closeModal}>
      {content}
    </Dialog>
  );
};
