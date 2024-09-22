"use client";

import { useModalStore } from "@/store/modal";
import { Button } from "@/components/ui/button";

export const LoginBtn = () => {
  const { openModal } = useModalStore();

  return (
    <>
      <Button onClick={() => openModal("login")}>Entrar</Button>
    </>
  );
};
