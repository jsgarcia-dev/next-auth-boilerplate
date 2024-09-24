import { create } from "zustand";

type ModalState = {
  isOpen: boolean;
  view: "login" | "register" | "reset" | "resend";
  openModal: (view: ModalState["view"]) => void;
  closeModal: () => void;
  setView: (view: ModalState["view"]) => void;
};

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  view: "login",
  openModal: (view) => set({ isOpen: true, view }),
  closeModal: () => set({ isOpen: false }),
  setView: (view) => set({ view }),
}));
