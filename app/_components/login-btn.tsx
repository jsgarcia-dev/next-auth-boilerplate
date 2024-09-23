"use client";

import { useModalStore } from "@/store/modal";
import { Button } from "@/components/ui/button";

export const LoginBtn = () => {
  const { openModal } = useModalStore();

  return (
    <>
      <Button
        variant="ghost"
        className="ring-[2px] ring-zinc-700/60 w-14 h-8 hover:bg-zinc-100"
        onClick={() => openModal("login")}
      >
        Entrar
      </Button>
    </>
  );
};
