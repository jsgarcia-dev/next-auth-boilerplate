"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRound } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

type UserAvatarProps = {
  user: {
    image?: string;
    name: string;
    email: string;
    role: string;
  };
  size?: "default" | "large";
};

export function UserAvatar({ user }: UserAvatarProps) {
  const { image = "", name, email, role } = user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={`cursor-pointer mt-2`}>
          <Avatar>
            <AvatarImage
              src={image}
              alt="imagem de avatar do usuário"
              className="size-9"
            />
            <AvatarFallback className="animate-shimmer bg-gradient-to-l from-gray-300 via-gray-200 to-gray-100 animate-pulse bg-[length:400%_100%]">
              {name
                .split(" ")
                .map((n) => n[0])
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mt-2">
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex items-stretch py-2">
            <Avatar className="size-10 mx-auto">
              {image ? (
                <AvatarImage
                  src={image}
                  className="size-10 border border-zinc-700/60 rounded-full p-1"
                />
              ) : (
                <AvatarFallback>
                  <UserRound size={40} />
                </AvatarFallback>
              )}
            </Avatar>
            <div className="text-left ml-1">
              <h3 className="text-sm font-semibold">{name}</h3>
              <p className="text-xs">{email}</p>
              <p className="text-xs">{role}</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile">
              Perfil
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              Configurações
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <button
            onClick={() => signOut()}
            className="w-full flex justify-between"
          >
            Sair
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
