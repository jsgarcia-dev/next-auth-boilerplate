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

        <div className="mt-5">
          {user && <p>Olá, {user.name}!</p>}
          <Link href="/dashboard">
            <button className="underline">Ir para o Dashboard</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
