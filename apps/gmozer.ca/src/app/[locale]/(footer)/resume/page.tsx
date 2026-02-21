import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@gmozer/ui";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SKILLS, type SkillCategoryId } from "@/constants/resume";

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

const categoryKeys: Record<
	SkillCategoryId,
	| "categories.frontend"
	| "categories.backend"
	| "categories.languages"
	| "categories.tools"
	| "categories.testing"
> = {
	frontend: "categories.frontend",
	backend: "categories.backend",
	languages: "categories.languages",
	tools: "categories.tools",
	testing: "categories.testing",
};

export default async function Skills() {
	const t = await getTranslations("resume.skills");

	return (
		<section className="flex flex-col gap-8">
			<header className="flex flex-col gap-4 text-center md:text-left">
				<h1 className="font-bold text-4xl">{t("title")}</h1>
				<p className="text-muted-foreground max-w-2xl mx-auto md:mx-0">
					{t("description")}
				</p>
			</header>

			<div className="flex flex-col gap-8">
				{SKILLS.map((category) => (
					<Card
						key={category.id}
						className="border-none shadow-none bg-transparent"
					>
						<CardHeader className="px-0 pt-0">
							<CardTitle className="text-2xl font-bold">
								{t(categoryKeys[category.id])}
							</CardTitle>
						</CardHeader>
						<CardContent className="px-0">
							<ul
								className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
								aria-label={`${category.title} skills`}
							>
								{category.items.map((skill) => (
									<li key={skill.name}>
										<Tooltip>
											<TooltipTrigger
												className="w-full flex-col gap-2 h-32 bg-card border hover:border-primary/50 hover:bg-accent/50 transition-all duration-300 rounded-xl flex justify-center items-center group"
												asChild
											>
												<Link href={skill.link} target="_blank">
													<div className="text-5xl group-hover:scale-110 group-hover:text-primary transition-all duration-300">
														{skill.icon}
													</div>
													<span className="font-medium text-sm text-muted-foreground group-hover:text-foreground transition-colors">
														{skill.name}
													</span>
												</Link>
											</TooltipTrigger>
											<TooltipContent className="capitalize">
												{skill.name}
											</TooltipContent>
										</Tooltip>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
}
