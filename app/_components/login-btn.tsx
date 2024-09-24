"use client";

import { useModalStore } from "@/store/modal";
import { Button } from "@/components/ui/button";
import DynamicButton from "./dynamic-button";

export const LoginBtn = () => {
  const { openModal } = useModalStore();

  return (
    <>
      <DynamicButton text="Entrar" onClick={() => openModal("login")} />
    </>
  );
};
