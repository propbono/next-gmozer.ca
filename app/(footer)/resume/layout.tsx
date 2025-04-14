"use client";

import { TABS } from "@/constants/resume";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function ResumeLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	const pathname = usePathname();

	return (
		<article className="min-h-[80vh] flex">
			<div className="container">
				<div className="flex flex-col sm:flex-row justify-center gap-16">
					<nav
						className="flex flex-col flex-grow-0 flex-1 min-w-56 w-full mx-auto md:mx-0 gap-6 h-auto rounded-md p-1 text-foreground"
						aria-label="Resume sections"
					>
						{TABS.map((tab) => {
							const isActive = pathname === tab.url;
							return (
								<Link
									key={tab.label}
									href={tab.url}
									aria-current={isActive ? "page" : undefined}
									className={cn(
										"inline-flex items-center w-full bg-white dark:bg-foreground justify-center whitespace-nowrap text-foreground dark:text-background rounded-lg p-3 text-balance font-medium ring-offset-white transition-all",
										{
											"text-background shadow-sm font-bold bg-primary dark:bg-primary":
												isActive,
										},
									)}
								>
									{tab.label}
								</Link>
							);
						})}
					</nav>
					<div className="flex-grow h-full">{children}</div>
				</div>
			</div>
		</article>
	);
}
