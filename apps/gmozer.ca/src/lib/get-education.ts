import { unstable_cache as cache } from "next/cache";
import { getLocale, getTranslations } from "next-intl/server";
import { resolveLocale } from "@/lib/locale";
import { getPayloadClient } from "@/lib/payload";
import { withPayloadFallback } from "@/lib/with-payload-fallback";
import type { Education } from "@/payload-types";

const EDUCATION_KEYS = ["aws", "wit", "ucw"] as const;

export async function getEducation(): Promise<Education[]> {
	return withPayloadFallback(getEducationFromPayload, getEducationFromMessages);
}

async function getEducationFromPayload(): Promise<Education[]> {
	try {
		const locale = await getLocale();

		return cache(
			async () => {
				const payload = await getPayloadClient();
				const { docs } = await payload.find({
					collection: "education",
					locale: resolveLocale(locale),
					fallbackLocale: "en",
					sort: "order",
				});
				return docs;
			},
			[`education-${locale}`],
			{ tags: ["education"], revalidate: 3600 },
		)();
	} catch (error) {
		// biome-ignore lint/suspicious/noConsole: Log fallback for debugging
		console.error("Failed to fetch education from Payload CMS:", error);
		// Fallback to JSON messages if Payload is inaccessible
		return getEducationFromMessages();
	}
}

async function getEducationFromMessages(): Promise<Education[]> {
	const t = await getTranslations("resume.education");

	return EDUCATION_KEYS.map((key, index) => {
		const durationStr = t(`items.${key}.duration`); // e.g., "2023 - 2025"
		const years = durationStr.split(" - ").map((year) => year.trim());

		const startDate = new Date(`${years[0]}-01-01T00:00:00Z`).toISOString();

		let endDate = null;
		let currentlyStudying = false;

		if (years.length > 1 && years[1].toLowerCase() !== "present") {
			endDate = new Date(`${years[1]}-12-31T00:00:00Z`).toISOString();
		} else if (years.length > 1 && years[1].toLowerCase() === "present") {
			currentlyStudying = true;
		} else {
			endDate = new Date(`${years[0]}-12-31T00:00:00Z`).toISOString();
		}

		return {
			id: -(index + 1), // negative to avoid collision with Payload's positive auto-increment IDs
			institution: t(`items.${key}.institution`),
			degree: t.has(`items.${key}.degree`) ? t(`items.${key}.degree`) : "",
			program: t.has(`items.${key}.program`) ? t(`items.${key}.program`) : "",
			startDate,
			endDate,
			currentlyStudying,
			order: index,
			updatedAt: "",
			createdAt: "",
		};
	});
}
