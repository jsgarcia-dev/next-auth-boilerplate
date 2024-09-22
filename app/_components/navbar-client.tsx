"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon } from "lucide-react";
import { LoginBtn } from "./login-btn";
import { UserAvatar } from "./user-avatar";

type UserInfo = {
  image?: string;
  name: string;
  email: string;
  role: string;
} | null;

export const NavbarMobileClient = ({ userInfo }: { userInfo: UserInfo }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Verifica se o usuário é admin
  const isAdmin = userInfo?.role === "Admin";

  const navigation = [
    { name: "Início", href: "/" },
    { name: "Sobre", href: "/sobre" },
    { name: "Serviços", href: "/servicos" },
    { name: "Contato", href: "/contato" },
    ...(isAdmin ? [{ name: "Dashboard", href: "/dashboard" }] : []),
  ];

  // Impede a rolagem do body quando o menu está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <nav className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <span className="text-xl font-semibold">Revit-alize</span>
            </Link>
            <div className="hidden md:flex md:items-center md:space-x-4 sm:ml-5">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <span className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          {/* Avatar ou botão de login */}
          <div className="hidden md:flex md:items-center">
            {userInfo ? <UserAvatar user={userInfo} /> : <LoginBtn />}
          </div>
          {/* Botão do menu mobile */}
          <div className="flex items-center md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none"
              aria-label="Abrir menu"
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>
      {/* Menu mobile em tela cheia com transição */}
      <div
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4">
          {/* Logo */}
          <Link href="/">
            <span className="text-xl font-semibold">Revit-alize</span>
          </Link>
          <Button
            variant="ghost"
            onClick={() => setIsOpen(false)}
            className="focus:outline-none"
            aria-label="Fechar menu"
          >
            <XIcon className="h-6 w-6" />
          </Button>
        </div>
        <div className="mt-8">
          <nav className="space-y-4">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <span
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-700 hover:text-gray-900 px-4 py-2 text-2xl font-medium"
                >
                  {item.name}
                </span>
              </Link>
            ))}
            <div className="px-4">
              {userInfo ? <UserAvatar user={userInfo} /> : <LoginBtn />}
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
};
