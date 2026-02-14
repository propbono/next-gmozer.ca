"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export default function ResumeLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	const pathname = usePathname();
	const resume = useTranslations("navigation.resume.children");

	return (
		<article className="container">
			<div className="flex flex-col sm:flex-row justify-center gap-16">
				<nav
					className="flex flex-col flex-grow-0 flex-1 min-w-56 w-full mx-auto md:mx-0 gap-6 h-auto rounded-md p-1 text-foreground"
					aria-label="Resume sections"
				>
					{[
						{
							label: resume("experience.title"),
							url: resume("experience.url"),
						},

						{
							label: resume("skills.title"),
							url: resume("skills.url"),
						},
						{
							label: resume("education.title"),
							url: resume("education.url"),
						},
						{
							label: resume("about.title"),
							url: resume("about.url"),
						},
					].map((tab) => (
						<Link
							key={tab.label}
							href={tab.url}
							className={cn(
								"inline-flex items-center w-full bg-white dark:bg-foreground justify-center whitespace-nowrap text-foreground dark:text-background rounded-lg p-3 text-balance font-medium ring-offset-white transition-all",
								{
									"text-background shadow-sm font-bold bg-primary dark:bg-primary":
										pathname === tab.url,
								},
							)}
						>
							{tab.label}
						</Link>
					))}
				</nav>
				<div className="flex-grow h-full">{children}</div>
			</div>
		</article>
	);
}
