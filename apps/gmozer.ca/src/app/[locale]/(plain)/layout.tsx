import type { ReactNode } from "react";
import { Header } from "@/components";

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
