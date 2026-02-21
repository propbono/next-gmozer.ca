"use client";

import { Button } from "@gmozer/ui";
import { cn } from "@gmozer/utils";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { FaBriefcase, FaCode, FaGraduationCap, FaUser } from "react-icons/fa6";
import { DownloadResume } from "@/components/resume-download";
import { Link, usePathname } from "@/i18n/navigation";

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
			Icon: FaCode,
		},
		{
			label: resume("experience.title"),
			url: resume("experience.url"),
			Icon: FaBriefcase,
		},
		{
			label: resume("education.title"),
			url: resume("education.url"),
			Icon: FaGraduationCap,
		},
		{
			label: resume("about.title"),
			url: resume("about.url"),
			Icon: FaUser,
		},
	];

	return (
		<article className="container">
			<div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16 items-start">
				<div className="flex flex-col gap-6 w-full md:w-auto md:min-w-56 flex-shrink-0">
					<nav
						className="flex flex-row md:flex-col flex-wrap md:flex-nowrap w-full gap-2 md:gap-6 h-auto rounded-md p-1 text-foreground"
						aria-label="Resume sections"
					>
						{navItems.map(({ label, url, Icon }) => (
							<Button
								asChild
								key={label}
								variant={pathname === url ? "default" : "outline"}
								className={cn(
									"inline-flex items-center flex-1 md:flex-none w-full justify-center md:justify-start whitespace-nowrap text-balance  transition-all",
									{
										"hover:bg-primary dark:hover:bg-primary": pathname === url,
									},
								)}
							>
								<Link href={url} title={label}>
									<Icon className="w-5 h-5 md:mr-3" />
									<span className="hidden md:inline">{label}</span>
								</Link>
							</Button>
						))}
						<div className="hidden md:block">
							<DownloadResume text={resume("download")} />
						</div>
					</nav>
				</div>

				<div className="flex flex-col gap-6 w-full flex-grow">
					<div className="md:hidden">
						<DownloadResume text={resume("download")} />
					</div>
					<div className="flex-grow h-full">{children}</div>
				</div>
			</div>
		</article>
	);
}
