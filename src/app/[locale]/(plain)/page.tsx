import { HeroPhoto } from "@/components/hero-photo";
import { DownloadResume } from "@/components/resume-download";
import { Socials } from "@/components/socials";
import { Stats } from "@/components/stats";
import { DEV_START_YEAR, TECHNOLOGIES_MASTERED } from "@/constants/main";
import { isValidLocale } from "@/i18n/routing";
import { MOCK_STATS, getGithubStats } from "@/services/github";
import type { Stat } from "@/types/stats";

import { differenceInCalendarYears } from "date-fns";
import { getTranslations } from "next-intl/server";

const PROPRIETARY_PROJECTS_COUNT = 10;
const PROPRIETARY_COMMITS_COUNT = 550;

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string };
}) {
	const t = await getTranslations({
		locale: isValidLocale(locale) ? locale : "en",
		namespace: "metadata.default",
	});

	return {
		title: t("title"),
		description: t("description"),
		keywords: [
			"Frontend Developer",
			"React Developer",
			"Next.js",
			"TypeScript",
			"Greg Mozer",
			"Portfolio",
		],
		openGraph: {
			title: t("title"),
			description: t("description"),
			url: t("url"),
			siteName: t("siteName"),
			locale: locale,
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title: t("title"),
			description: t("description"),
			creator: "@GregMozer",
		},
		alternates: {
			canonical: t("url"),
			languages: {
				en: "https://gmozer.ca/en",
				pl: "https://gmozer.ca/pl",
			},
		},
	};
}

export default async function Home() {
	const t = await getTranslations("home");

	const yearsOfExperience = differenceInCalendarYears(
		new Date(),
		DEV_START_YEAR,
	);
	const githubStats = await getGithubStats();

	const stats: Stat[] = [
		{ title: t("stats.yearsExperience"), value: yearsOfExperience },
		{
			title: t("stats.projectsCompleted"),
			value:
				githubStats.status === "success"
					? PROPRIETARY_PROJECTS_COUNT + githubStats.data.projectCount
					: PROPRIETARY_PROJECTS_COUNT + MOCK_STATS.projectCount,
		},
		{ title: t("stats.technologiesUsed"), value: TECHNOLOGIES_MASTERED },
		{
			title: t("stats.commits"),
			value:
				githubStats.status === "success"
					? PROPRIETARY_COMMITS_COUNT + githubStats.data.allCommitsCount
					: PROPRIETARY_COMMITS_COUNT + MOCK_STATS.allCommitsCount,
		},
	];

	return (
		<main className="flex flex-col min-h-screen justify-around gap-8 py-6 md:pt-24">
			<section
				className="container flex flex-col md:flex-row items-center md:justify-between gap-8"
				aria-labelledby="hero-heading"
			>
				<div className="max-w-2xl order-2 md:order-none">
					<p className="text-xl mb-2 2xl:mb-4">{t("hero.position")}</p>
					<h2 className="w-full mb-4 2xl:mb-6 font-logo text-4xl md:text-5xl font-bold leading-relaxed md:leading-snug text-foreground">
						{t.rich("hero.title", {
							span: (chunks) => <span className="text-primary">{chunks}</span>,
						})}
					</h2>
					<p className="font-body text-xl md:text-2xl font-medium leading-relaxed text-muted-foreground md:leading-normal mb-5 2xl:mb-7">
						{t("hero.description")}
					</p>
					<div className="flex flex-col md:flex-row gap-8 items-center">
						<DownloadResume text={t("hero.downloadResume")} />
						<Socials
							containerStyles="flex gap-6"
							iconStyles="size-9 border border-primary rounded-full flex justify-center items-center text-primary text-base hover:bg-primary hover:text-background hover:transition-all duration-500"
						/>
					</div>
				</div>
				<aside className="order-1 md:order-none mb-6 md:mb-0">
					<HeroPhoto />
				</aside>
			</section>

			<section className="container" aria-labelledby="stats-heading">
				<h2 id="stats-heading" className="sr-only">
					{t("stats.srTitle")}
				</h2>
				<Stats stats={stats} />
			</section>
		</main>
	);
}
