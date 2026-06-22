import { unstable_cache as cache } from "next/cache";
import { getLocale, getTranslations } from "next-intl/server";
import { resolveLocale } from "@/lib/locale";
import { getPayloadClient } from "@/lib/payload";
import { withPayloadFallback } from "@/lib/with-payload-fallback";

export type AboutData = {
	title: string;
	description: string;
	items: {
		name: string;
		phone: string;
		email: string;
		location: string;
		nationality: string;
		languages: string;
	};
};

export async function getAbout(): Promise<AboutData> {
	return withPayloadFallback(async () => {
		const locale = await getLocale();
		return getAboutFromPayload(locale);
	}, getAboutFromMessages);
}

async function getAboutFromPayload(locale: string): Promise<AboutData> {
	return cache(
		async () => {
			const payload = await getPayloadClient();

			const about = await payload.findGlobal({
				slug: "about-me",
				locale: resolveLocale(locale),
			});

			return {
				title: about.title,
				description: about.description,
				items: {
					name: about.name,
					phone: about.phone,
					email: about.email,
					location: about.location,
					nationality: about.nationality,
					languages: about.languages
						.map((item) => item.language)
						.filter(Boolean)
						.join(", "),
				},
			};
		},
		[`about-me-${locale}`],
		{ tags: ["about-me"], revalidate: 3600 },
	)();
}

async function getAboutFromMessages(): Promise<AboutData> {
	const t = await getTranslations("resume.about");

	return {
		title: t("title"),
		description: t("description"),
		items: {
			name: t("items.name.value"),
			phone: t("items.phone.value"),
			email: t("items.email.value"),
			location: t("items.location.value"),
			nationality: t("items.nationality.value"),
			languages: t("items.languages.value"),
		},
	};
}
