import { Footer, Navbar } from "@components";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <section className="flex min-h-screen flex-col overflow-hidden dark:bg-zinc-900">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </section>
  );
}
