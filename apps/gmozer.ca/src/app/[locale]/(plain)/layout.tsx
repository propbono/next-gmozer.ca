import type { ReactNode } from "react";
import { Header } from "@/components/header";

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
