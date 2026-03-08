import {
	Timeline,
	TimelineDetails,
	TimelineDuration,
	TimelineItem,
	TimelineTitle,
} from "@gmozer/ui";
import { calculateExperienceDuration } from "@gmozer/utils";
import { getFormatter, getTranslations } from "next-intl/server";
import { getExperiences } from "@/lib/get-experiences";

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
	const format = await getFormatter();
	const positions = await getExperiences();

	return (
		<section className="flex flex-col gap-8" aria-label="Experience timeline">
			<header className="flex flex-col gap-4 text-center md:text-left">
				<h1 className="text-4xl font-bold">{t("title")}</h1>
				<p className="max-w-xl mx-auto md:mx-0 text-muted-foreground">
					{t("description")}
				</p>
			</header>

			<Timeline>
				{positions.map((item, index) => {
					// Date calculations
					const durationObj = calculateExperienceDuration(
						item.startDate,
						item.endDate,
					);
					const startDateFormatted = format.dateTime(new Date(item.startDate), {
						year: "numeric",
						month: "short",
					});
					const endDateFormatted = item.currentlyWorking
						? t("present")
						: item.endDate
							? format.dateTime(new Date(item.endDate), {
									year: "numeric",
									month: "short",
								})
							: "";

					const fullDuration = t("duration", {
						years: durationObj.years,
						months: durationObj.months,
					}).trim();

					return (
						<TimelineItem
							key={`${item.company}-${index}`}
							index={index}
							isLast={index === positions.length - 1}
						>
							<TimelineDuration>
								{startDateFormatted} - {endDateFormatted}
								{fullDuration ? ` (${fullDuration})` : ""}
							</TimelineDuration>
							<TimelineTitle>{item.position}</TimelineTitle>
							<TimelineDetails
								primary={item.company}
								secondary={item.location}
							/>
						</TimelineItem>
					);
				})}
			</Timeline>
		</section>
	);
}
