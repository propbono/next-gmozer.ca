import type { Project } from "@gmozer/types";
import { isStringArray } from "@gmozer/utils";
import { getLocale, getTranslations } from "next-intl/server";
import { PROJECT_KEYS } from "@/constants/main";
import { checkPayloadEnabled } from "@/lib/check-payload-enabled";
import { getPayloadClient } from "@/lib/payload";

const getProjectsFromPayload = async (locale: string): Promise<Project[]> => {
	const payload = await getPayloadClient();

	const { docs } = await payload.find({
		collection: "projects",
		locale: locale as "en" | "pl",
		sort: "order",
		limit: 100,
	});

	return docs.map((doc) => {
		const media =
			typeof doc.image === "object" && doc.image !== null ? doc.image : null;

		return {
			title: doc.title,
			category: doc.category,
			description: doc.description,
			liveLink: doc.liveLink ?? undefined,
			githubLink: doc.githubLink ?? "",
			stack: Array.isArray(doc.stack)
				? doc.stack.map((item) =>
						typeof item === "object" && item !== null && "name" in item
							? String(item.name)
							: String(item),
					)
				: [],
			image: media?.url ?? undefined,
			imageSizes: media?.sizes ?? null,
		};
	});
};

const getProjectsFromMessages = async (): Promise<Project[]> => {
	const t = await getTranslations("work");

	return PROJECT_KEYS.map((key) => ({
		title: t(`projects.${key}.title`),
		category: t(`projects.${key}.category`),
		description: t(`projects.${key}.description`),
		liveLink: t.has(`projects.${key}.liveLink`)
			? t(`projects.${key}.liveLink`)
			: undefined,
		githubLink: t(`projects.${key}.githubLink`),
		stack:
			t.has(`projects.${key}.stack`) &&
			isStringArray(t.raw(`projects.${key}.stack`))
				? t.raw(`projects.${key}.stack`)
				: [],
		image: t.has(`projects.${key}.image`)
			? t(`projects.${key}.image`)
			: undefined,
	}));
};

export const getProjects = async (): Promise<Project[]> => {
	const isPayloadEnabled = await checkPayloadEnabled();

	if (isPayloadEnabled) {
		try {
			const locale = await getLocale();
			return await getProjectsFromPayload(locale);
		} catch (error) {
			// biome-ignore lint/suspicious/noConsole: Log fallback for debugging
			console.error(
				"Failed to fetch from Payload, falling back to JSON:",
				error,
			);
			return getProjectsFromMessages();
		}
	}

	return getProjectsFromMessages();
};
