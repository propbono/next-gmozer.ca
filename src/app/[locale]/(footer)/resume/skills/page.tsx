import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { SKILLS } from "@/constants/resume";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export async function generateMetadata() {
	const t = await getTranslations("metadata");

	return {
		title: t("resume.skills.title"),
		description: t("resume.skills.description"),
		openGraph: {
			title: t("resume.skills.title"),
			description: t("resume.skills.description"),
			images: [{ url: t("default.image") }],
			type: "website",
			siteName: t("default.siteName"),
			url: t("resume.skills.url"),
		},
		twitter: {
			card: "summary_large_image",
			title: t("resume.skills.title"),
			description: t("resume.skills.description"),
			images: [t("default.image")],
		},
		metadataBase: new URL(t("default.url")),
	};
}

export default function Skills() {
	const t = useTranslations("resume.skills");

	return (
		<section className="flex flex-col gap-8">
			<header className="flex flex-col gap-8 text-center md:text-left">
				<h1 className="font-bold text-4xl">{t("title")}</h1>
				<p className="text-muted-foreground max-w-2xl mx-auto md:mx-0">
					{t("description")}
				</p>
			</header>
			<ul
				className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-8"
				aria-label="Technical skills"
			>
				{SKILLS.items.map((skill) => (
					<li key={skill.name}>
						<Tooltip>
							<TooltipTrigger
								className="w-full flex-col gap-2 h-40 bg-background text-foreground rounded-xl flex justify-center items-center group"
								asChild
							>
								<Link href={skill.link} target="_blank">
									<div className="text-6xl group-hover:text-primary transition-all duration-300">
										{skill.icon}
									</div>
									<span className="not-sr-only sm:sr-only">{skill.name}</span>
								</Link>
							</TooltipTrigger>
							<TooltipContent className="capitalize">
								{skill.name}
							</TooltipContent>
						</Tooltip>
					</li>
				))}
			</ul>
		</section>
	);
}
