import { getLocale, getTranslations } from "next-intl/server";
import { checkPayloadEnabled } from "@/lib/check-payload-enabled";
import { getPayloadClient } from "@/lib/payload";
import type { Experience } from "@/payload-types";

const EXPERIENCE_KEYS = ["heineken", "rangle", "cgi2", "cgi1", "dcm"] as const;

const getExperiencesFromPayload = async (
	locale: string,
): Promise<Experience[]> => {
	const payload = await getPayloadClient();

	const { docs } = await payload.find({
		collection: "experiences",
		locale: locale as "en" | "pl",
		sort: "order",
		limit: 100,
	});

	return docs;
};

const getExperiencesFromMessages = async (): Promise<
	Pick<
		Experience,
		| "position"
		| "company"
		| "location"
		| "startDate"
		| "endDate"
		| "currentlyWorking"
	>[]
> => {
	const t = await getTranslations("resume.experience");

	return EXPERIENCE_KEYS.map((key) => {
		// Use literal arrays/maps or switch to satisfy next-intl strict types
		// without string templates

		let currentlyWorkingStr: string;
		let positionStr: string;
		let companyStr: string;
		let locationStr: string;
		let startDateStr: string;
		let endDateStr: string | null = null;

		switch (key) {
			case "heineken":
				// @ts-expect-error dynamic keys exist in json
				currentlyWorkingStr = t("positions.heineken.currentlyWorking");
				positionStr = t("positions.heineken.position");
				companyStr = t("positions.heineken.company");
				locationStr = t("positions.heineken.location");
				startDateStr = t("positions.heineken.startDate");
				// @ts-expect-error JSON contains null for this key instead of string
				endDateStr = t.has("positions.heineken.endDate")
					? // @ts-expect-error JSON contains null for this key instead of string
						t("positions.heineken.endDate")
					: null;
				break;
			case "rangle":
				// @ts-expect-error dynamic keys exist in json
				currentlyWorkingStr = t("positions.rangle.currentlyWorking");
				positionStr = t("positions.rangle.position");
				companyStr = t("positions.rangle.company");
				locationStr = t("positions.rangle.location");
				startDateStr = t("positions.rangle.startDate");
				endDateStr = t.has("positions.rangle.endDate")
					? t("positions.rangle.endDate")
					: null;
				break;
			case "cgi2":
				// @ts-expect-error dynamic keys exist in json
				currentlyWorkingStr = t("positions.cgi2.currentlyWorking");
				positionStr = t("positions.cgi2.position");
				companyStr = t("positions.cgi2.company");
				locationStr = t("positions.cgi2.location");
				startDateStr = t("positions.cgi2.startDate");
				endDateStr = t.has("positions.cgi2.endDate")
					? t("positions.cgi2.endDate")
					: null;
				break;
			case "cgi1":
				// @ts-expect-error dynamic keys exist in json
				currentlyWorkingStr = t("positions.cgi1.currentlyWorking");
				positionStr = t("positions.cgi1.position");
				companyStr = t("positions.cgi1.company");
				locationStr = t("positions.cgi1.location");
				startDateStr = t("positions.cgi1.startDate");
				endDateStr = t.has("positions.cgi1.endDate")
					? t("positions.cgi1.endDate")
					: null;
				break;
			case "dcm":
				// @ts-expect-error dynamic keys exist in json
				currentlyWorkingStr = t("positions.dcm.currentlyWorking");
				positionStr = t("positions.dcm.position");
				companyStr = t("positions.dcm.company");
				locationStr = t("positions.dcm.location");
				startDateStr = t("positions.dcm.startDate");
				endDateStr = t.has("positions.dcm.endDate")
					? t("positions.dcm.endDate")
					: null;
				break;
			default:
				throw new Error(`Unknown experience key: ${key}`);
		}

		return {
			position: positionStr,
			company: companyStr,
			location: locationStr,
			startDate: startDateStr,
			endDate: endDateStr,
			// Boolean casting for robust handling whether JSON returns a string or true
			currentlyWorking: String(currentlyWorkingStr) === "true",
		};
	});
};

export const getExperiences = async (): Promise<
	Pick<
		Experience,
		| "position"
		| "company"
		| "location"
		| "startDate"
		| "endDate"
		| "currentlyWorking"
	>[]
> => {
	const isPayloadEnabled = await checkPayloadEnabled();

	if (isPayloadEnabled) {
		try {
			const locale = await getLocale();
			return await getExperiencesFromPayload(locale);
		} catch (error) {
			// biome-ignore lint/suspicious/noConsole: Log fallback for debugging
			console.error(
				"Failed to fetch experiences from Payload, falling back to JSON:",
				error,
			);
			return getExperiencesFromMessages();
		}
	}

	return getExperiencesFromMessages();
};
