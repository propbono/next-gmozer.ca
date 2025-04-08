import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import type { ReactNode } from "react";

export default function FooterLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<>
			<Header />
			<main className="flex flex-grow flex-col min-h-full gap-8 py-6 md:pt-32">
				{children}
			</main>
			<Footer />
		</>
	);
}
