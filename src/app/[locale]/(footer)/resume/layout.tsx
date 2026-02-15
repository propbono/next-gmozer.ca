"use client";

import { Briefcase, Code, GraduationCap, User } from "lucide-react";
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

	const navItems = [
		{
			label: resume("skills.title"),
			url: resume("skills.url"),
			Icon: Code,
		},
		{
			label: resume("experience.title"),
			url: resume("experience.url"),
			Icon: Briefcase,
		},
		{
			label: resume("education.title"),
			url: resume("education.url"),
			Icon: GraduationCap,
		},
		{
			label: resume("about.title"),
			url: resume("about.url"),
			Icon: User,
		},
	];

	return (
		<article className="container">
			<div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
				<nav
					className="flex flex-row md:flex-col flex-wrap md:flex-nowrap flex-grow-0 flex-1 min-w-full md:min-w-56 w-full mx-auto md:mx-0 gap-2 md:gap-6 h-auto rounded-md p-1 text-foreground"
					aria-label="Resume sections"
				>
					{navItems.map(({ label, url, Icon }) => (
						<Link
							key={label}
							href={url}
							className={cn(
								"inline-flex items-center flex-1 md:flex-none w-full bg-white dark:bg-foreground justify-center whitespace-nowrap text-foreground dark:text-background rounded-lg p-3 text-balance font-medium ring-offset-white transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800",
								{
									"text-background shadow-sm font-bold bg-primary dark:bg-primary hover:bg-primary dark:hover:bg-primary":
										pathname === url,
								},
							)}
							title={label}
						>
							<Icon className="w-5 h-5 md:mr-2" />
							<span className="hidden md:inline">{label}</span>
						</Link>
					))}
				</nav>
				<div className="flex-grow w-full h-full">{children}</div>
			</div>
		</article>
	);
}
