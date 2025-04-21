"use client";

import { PAGE_URLS, RESUME_URLS } from "@/constants/urls";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export default function ResumeLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	const pathname = usePathname();
	const t = useTranslations("resume.tabs");

	return (
		<article className="container">
			<div className="flex flex-col sm:flex-row justify-center gap-16">
				<nav
					className="flex flex-col flex-grow-0 flex-1 min-w-56 w-full mx-auto md:mx-0 gap-6 h-auto rounded-md p-1 text-foreground"
					aria-label="Resume sections"
				>
					{[
						{
							label: t("experience"),
							url: `${PAGE_URLS.resume}${RESUME_URLS.experience}`,
						},

						{
							label: t("skills"),
							url: `${PAGE_URLS.resume}${RESUME_URLS.skills}`,
						},
						{
							label: t("education"),
							url: `${PAGE_URLS.resume}${RESUME_URLS.education}`,
						},
						{
							label: t("about"),
							url: `${PAGE_URLS.resume}${RESUME_URLS.about}`,
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
