import Navbar from "@/app/_components/navbar";
import NavbarMobile from "../_components/navbar";
import Provider from "../_components/provider";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <Navbar />
      <NavbarMobile />
      <main className="max-w-7xl mx-auto pt-24">{children}</main>
    </Provider>
  );
}
