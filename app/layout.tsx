import type { Metadata } from "next";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthModal } from "./(auth)/_components/auth-modal";
import Provider from "./_components/provider";
import localFont from "next/font/local";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: "Next Boilerplate | Home",
    template: "Next Boilerplate | %s",
  },
  description:
    "Um boilerplate moderno e eficiente para aplicações Next.js, oferecendo uma estrutura inicial robusta e flexível para o desenvolvimento rápido de projetos web.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.className} ${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen`}
      >
        <Provider>
          <main className="flex-grow">{children}</main>
          <AuthModal />
          <Toaster position="top-right" richColors theme="light" />
        </Provider>
      </body>
    </html>
  );
}
