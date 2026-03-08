import {
	Timeline,
	TimelineDetails,
	TimelineDuration,
	TimelineItem,
	TimelineTitle,
} from "@gmozer/ui";
import { getFormatter, getTranslations } from "next-intl/server";
import { getEducation } from "@/lib/get-education";

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

	const format = await getFormatter();
	const educationItems = await getEducation();

	return (
		<section className="flex flex-col gap-8" aria-label="Education timeline">
			<header className="flex flex-col gap-4 text-center md:text-left">
				<h1 className="text-4xl font-bold">{t("title")}</h1>
				<p className="max-w-xl mx-auto md:mx-0 text-muted-foreground">
					{t("description")}
				</p>
			</header>

			<Timeline>
				{educationItems.map((item, index) => {
					// We only show years for education
					const startYear = format.dateTime(new Date(item.startDate), {
						year: "numeric",
					});
					const endYear = item.currentlyStudying
						? "Present"
						: item.endDate
							? format.dateTime(new Date(item.endDate), {
									year: "numeric",
								})
							: "";

					const durationDisplay =
						startYear === endYear ? startYear : `${startYear} - ${endYear}`;

					return (
						<TimelineItem
							key={`${item.institution}-${index}`}
							index={index}
							isLast={index === educationItems.length - 1}
						>
							<TimelineDuration>{durationDisplay}</TimelineDuration>
							<TimelineTitle>{item.degree}</TimelineTitle>
							<TimelineDetails
								primary={item.institution}
								secondary={item.program || undefined}
							/>
						</TimelineItem>
					);
				})}
			</Timeline>
		</section>
	);
}
