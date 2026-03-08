import { getLocale, getTranslations } from "next-intl/server";
import { checkPayloadEnabled } from "@/lib/check-payload-enabled";
import { getPayloadClient } from "@/lib/payload";
import type { Education } from "@/payload-types";

const EDUCATION_KEYS = ["aws", "wit", "ucw"] as const;

export async function getEducation(): Promise<Education[]> {
	const isPayloadEnabled = await checkPayloadEnabled();

	if (isPayloadEnabled) {
		return getEducationFromPayload();
	}

	return getEducationFromMessages();
}

async function getEducationFromPayload(): Promise<Education[]> {
	try {
		const payload = await getPayloadClient();
		const locale = await getLocale();

		const { docs } = await payload.find({
			collection: "education",
			locale: locale as "en" | "pl",
			fallbackLocale: "en",
			sort: "order",
		});

		return docs;
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
		// Extract proper fallback dates according to current JSON string keys
		const durationStr = t(`items.${key}.duration`); // e.g., "2023 - 2025"
		const years = durationStr.split(" - ").map((year) => year.trim());

		const startDate = new Date(`${years[0]}-01-01T00:00:00Z`).toISOString();

		let endDate = null;
		let currentlyStudying = false;

		// If it's single year, or starts with "present"/empty, figure out logic
		if (years.length > 1 && years[1].toLowerCase() !== "present") {
			endDate = new Date(`${years[1]}-12-31T00:00:00Z`).toISOString();
		} else if (years.length > 1 && years[1].toLowerCase() === "present") {
			currentlyStudying = true;
		} else {
			// Single year education, start and end are the same
			endDate = new Date(`${years[0]}-12-31T00:00:00Z`).toISOString();
		}

		return {
			id: index + 1000, // Provide strict number IDs for fallback payload types
			institution: t(`items.${key}.institution`),
			degree: t.has(`items.${key}.degree`) ? t(`items.${key}.degree`) : "",
			program: t.has(`items.${key}.program`) ? t(`items.${key}.program`) : "",
			startDate,
			endDate,
			currentlyStudying,
			order: index,
			updatedAt: new Date().toISOString(),
			createdAt: new Date().toISOString(),
		};
	});
}
