import {
	Timeline,
	TimelineDetails,
	TimelineDuration,
	TimelineItem,
	TimelineTitle,
} from "@gmozer/ui";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
	const t = await getTranslations("metadata");

	return {
		title: t("resume.education.title"),
		description: t("resume.education.description"),
		openGraph: {
			title: t("resume.education.title"),
			description: t("resume.education.description"),
			images: [{ url: t("default.image") }],
			type: "website",
			siteName: t("default.siteName"),
			url: t("resume.education.url"),
		},
		twitter: {
			card: "summary_large_image",
			title: t("resume.education.title"),
			description: t("resume.education.description"),
			images: [t("default.image")],
		},
		metadataBase: new URL(t("default.url")),
	};
}

export default async function Education() {
	const t = await getTranslations("resume.education");

	const educationItems = [
		{
			degree: t("items.aws.degree"),
			institution: t("items.aws.institution"),
			program: t("items.aws.program"),
			duration: t("items.aws.duration"),
		},
		{
			degree: t("items.wit.degree"),
			institution: t("items.wit.institution"),
			program: t("items.wit.program"),
			duration: t("items.wit.duration"),
		},
		{
			degree: t("items.ucw.degree"),
			institution: t("items.ucw.institution"),
			program: t("items.ucw.program"),
			duration: t("items.ucw.duration"),
		},
	];

	return (
		<section className="flex flex-col gap-8" aria-label="Education timeline">
			<header className="flex flex-col gap-4 text-center md:text-left">
				<h1 className="text-4xl font-bold">{t("title")}</h1>
				<p className="max-w-xl mx-auto md:mx-0 text-muted-foreground">
					{t("description")}
				</p>
			</header>

			<Timeline>
				{educationItems.map((item, index) => (
					<TimelineItem
						key={`${item.institution}-${index}`}
						index={index}
						isLast={index === educationItems.length - 1}
					>
						<TimelineDuration>{item.duration}</TimelineDuration>
						<TimelineTitle>{item.degree}</TimelineTitle>
						<TimelineDetails
							primary={item.institution}
							secondary={item.program || undefined}
						/>
					</TimelineItem>
				))}
			</Timeline>
		</section>
	);
}
