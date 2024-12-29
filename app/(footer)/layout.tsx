import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function FooterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main className="flex flex-grow flex-col min-h-full gap-8 py-6 md:pt-32 2xl:pt-44">
        {children}
      </main>
      <Footer />
    </>
  );
}
