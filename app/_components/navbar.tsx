import { auth } from "@/auth";
import { NavbarMobileClient } from "./navbar-client";

export default async function NavbarMobile() {
  const session = await auth();

  const userInfo = session?.user
    ? {
        image: session.user.image ?? undefined,
        name: session.user.name ?? "",
        email: session.user.email ?? "",
        role: session.user.role ?? "",
      }
    : null;

  return <NavbarMobileClient userInfo={userInfo} />;
}
