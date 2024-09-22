import { LoginForm } from "@/components/form/login-form";
import { currentUser } from "@/lib/auth";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home() {
  const user = await currentUser();

  return (
    <div>
      <div>
        <h1>Bem-vindo à Página Inicial</h1>
        {!user ? (
          <Link href="/login">
            <button>Login</button>
          </Link>
        ) : (
          <div>
            <p>Olá, {user?.name}!</p>
            <Link href="/dashboard">
              <button>Ir para o Dashboard</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
