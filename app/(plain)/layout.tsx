import { Header } from "@/components/header";
import type { ReactNode } from "react";

export default function PlainLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<>
			<Header />
			{children}
		</>
	);
}
