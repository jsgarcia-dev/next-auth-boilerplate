import { Button } from "@/components/ui/button";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";
import { signOut } from "@/auth";
import Link from "next/link";
import { currentUser } from "@/lib/auth";
import { LoginBtn } from "./login-btn";

function UserAvatar({ image = "", size = "default" }) {
  const avatarClass = size === "large" ? "w-24 h-24" : "";
  const iconSize = size === "large" ? 40 : undefined;

  return (
    <Avatar className={avatarClass}>
      <AvatarImage src={image} />
      <AvatarFallback>
        <UserRound size={iconSize} />
      </AvatarFallback>
    </Avatar>
  );
}

function AuthNav({
  user,
}: {
  user: { image?: string; name: string; email: string; role: string };
}) {
  const { image = "", name, email, role } = user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="pr-4 rounded-none h-fit flex gap-x-2 focus-visible:ring-offset-0"
        >
          <UserAvatar image={image} />
          <p>{name}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex flex-col gap-y-2 py-4">
            <UserAvatar image={image} size="large" />
            <div className="text-center">
              <h3 className="text-lg font-semibold">{name}</h3>
              <p className="text-sm">{email}</p>
              <p className="text-sm">{role}</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile">
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <DropdownMenuItem asChild>
            <button type="submit" className="w-full flex justify-between">
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default async function Navbar() {
  const user = await currentUser();

  const userInfo = user
    ? {
        image: user.image ?? undefined,
        name: user.name ?? "",
        email: user.email ?? "",
        role: user.role ?? "",
      }
    : null;

  return (
    <nav className="flex gap-x-4 items-center justify-between bg-gray-50 shadow-sm pl-4">
      <Link href="/">
        <h1 className="text-2xl font-semibold">Next Dashboard</h1>
      </Link>
      {userInfo ? <AuthNav user={userInfo} /> : <LoginBtn />}
    </nav>
  );
}
