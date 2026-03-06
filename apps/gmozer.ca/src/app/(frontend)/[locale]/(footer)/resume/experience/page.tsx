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
		title: t("resume.experience.title"),
		description: t("resume.experience.description"),
		openGraph: {
			title: t("resume.experience.title"),
			description: t("resume.experience.description"),
			images: [{ url: t("default.image") }],
			type: "website",
			siteName: t("default.siteName"),
			url: t("resume.experience.url"),
		},
		twitter: {
			card: "summary_large_image",
			title: t("resume.experience.title"),
			description: t("resume.experience.description"),
			images: [t("default.image")],
		},
		metadataBase: new URL(t("default.url")),
	};
}

export default async function Experience() {
	const t = await getTranslations("resume.experience");

	const positions = [
		{
			position: t("positions.heineken.position"),
			company: t("positions.heineken.company"),
			location: t("positions.heineken.location"),
			duration: t("positions.heineken.duration"),
		},
		{
			position: t("positions.rangle.position"),
			company: t("positions.rangle.company"),
			location: t("positions.rangle.location"),
			duration: t("positions.rangle.duration"),
		},
		{
			position: t("positions.cgi2.position"),
			company: t("positions.cgi2.company"),
			location: t("positions.cgi2.location"),
			duration: t("positions.cgi2.duration"),
		},
		{
			position: t("positions.cgi1.position"),
			company: t("positions.cgi1.company"),
			location: t("positions.cgi1.location"),
			duration: t("positions.cgi1.duration"),
		},
		{
			position: t("positions.dcm.position"),
			company: t("positions.dcm.company"),
			location: t("positions.dcm.location"),
			duration: t("positions.dcm.duration"),
		},
	];

	return (
		<section className="flex flex-col gap-8" aria-label="Experience timeline">
			<header className="flex flex-col gap-4 text-center md:text-left">
				<h1 className="text-4xl font-bold">{t("title")}</h1>
				<p className="max-w-xl mx-auto md:mx-0 text-muted-foreground">
					{t("description")}
				</p>
			</header>

			<Timeline>
				{positions.map((item, index) => (
					<TimelineItem
						key={`${item.company}-${index}`}
						index={index}
						isLast={index === positions.length - 1}
					>
						<TimelineDuration>{item.duration}</TimelineDuration>
						<TimelineTitle>{item.position}</TimelineTitle>
						<TimelineDetails primary={item.company} secondary={item.location} />
					</TimelineItem>
				))}
			</Timeline>
		</section>
	);
}
