import { unstable_cache as cache } from "next/cache";
import { getLocale, getTranslations } from "next-intl/server";
import { checkPayloadEnabled } from "@/lib/check-payload-enabled";
import { resolveLocale } from "@/lib/locale";
import { getPayloadClient } from "@/lib/payload";
import type { Experience } from "@/payload-types";

const EXPERIENCE_KEYS = ["heineken", "rangle", "cgi2", "cgi1", "dcm"] as const;

const getExperiencesFromPayload = async (
	locale: string,
): Promise<Experience[]> => {
	try {
		return await cache(
			async () => {
				const payload = await getPayloadClient();

				const { docs } = await payload.find({
					collection: "experiences",
					locale: resolveLocale(locale),
					sort: "order",
					limit: 100,
				});

				return docs;
			},
			[`experiences-${locale}`],
			{ tags: ["experiences"], revalidate: 3600 },
		)();
	} catch (error) {
		// biome-ignore lint/suspicious/noConsole: Log fallback for debugging
		console.error("Failed to fetch experiences from Payload CMS:", error);
		return getExperiencesFromMessages();
	}
};

const getExperiencesFromMessages = async (): Promise<Experience[]> => {
	const t = await getTranslations("resume.experience");

	// @ts-expect-error — dynamic key into translation messages (temporary fallback)
	const positions = t.raw("positions") as Record<
		string,
		Record<string, unknown>
	>;

	return EXPERIENCE_KEYS.map((key, index) => {
		const entry = positions[key];

		return {
			id: -(index + 1),
			position: String(entry.position),
			company: String(entry.company),
			location: String(entry.location),
			startDate: String(entry.startDate),
			endDate: entry.endDate !== null ? String(entry.endDate) : null,
			currentlyWorking: String(entry.currentlyWorking) === "true",
			order: index,
			updatedAt: "",
			createdAt: "",
		};
	});
};

export const getExperiences = async (): Promise<Experience[]> => {
	const isPayloadEnabled = await checkPayloadEnabled();

	if (isPayloadEnabled) {
		const locale = await getLocale();
		return getExperiencesFromPayload(locale);
	}

	return getExperiencesFromMessages();
};
