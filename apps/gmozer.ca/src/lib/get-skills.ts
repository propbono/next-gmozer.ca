import { unstable_cache as cache } from "next/cache";
import { getLocale } from "next-intl/server";
import {
	SKILLS,
	type SkillCategory,
	type SkillCategoryId,
} from "@/constants/resume";
import { checkPayloadEnabled } from "@/lib/check-payload-enabled";
import { iconMap } from "@/lib/icon-map";
import { resolveLocale } from "@/lib/locale";
import { getPayloadClient } from "@/lib/payload";
import type { SkillCategory as PayloadSkillCategory } from "@/payload-types";

export async function getSkills(): Promise<SkillCategory[]> {
	const isPayloadEnabled = await checkPayloadEnabled();

	if (isPayloadEnabled) {
		try {
			const locale = await getLocale();
			return await getSkillsFromPayload(locale);
		} catch (error) {
			// biome-ignore lint/suspicious/noConsole: Log fallback for debugging
			console.error(
				"Failed to fetch Skills from Payload, falling back to constant:",
				error,
			);
			return SKILLS;
		}
	}

	return SKILLS;
}

async function getSkillsFromPayload(locale: string): Promise<SkillCategory[]> {
	return cache(
		async () => {
			const payload = await getPayloadClient();

			const { docs } = await payload.find({
				collection: "skill-categories",
				locale: resolveLocale(locale),
				sort: "order",
				limit: 100,
			});

			return docs.map((doc: PayloadSkillCategory) => ({
				id: doc.slug as SkillCategoryId,
				title: doc.title,
				items:
					doc.skills?.map((skill) => ({
						name: skill.name,
						link: skill.link || "",
						icon: iconMap[skill.iconName] || null,
					})) || [],
			}));
		},
		[`skills-${locale}`],
		{ tags: ["skills"], revalidate: 3600 },
	)();
}
