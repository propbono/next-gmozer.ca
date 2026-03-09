import { getLocale, getTranslations } from "next-intl/server";
import { checkPayloadEnabled } from "@/lib/check-payload-enabled";
import { getPayloadClient } from "@/lib/payload";

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
	const isPayloadEnabled = await checkPayloadEnabled();

	if (isPayloadEnabled) {
		try {
			const locale = await getLocale();
			return await getAboutFromPayload(locale);
		} catch (error) {
			// biome-ignore lint/suspicious/noConsole: Log fallback for debugging
			console.error(
				"Failed to fetch AboutMe from Payload, falling back to JSON:",
				error,
			);
			return getAboutFromMessages();
		}
	}

	return getAboutFromMessages();
}

async function getAboutFromPayload(locale: string): Promise<AboutData> {
	const payload = await getPayloadClient();

	const about = await payload.findGlobal({
		slug: "about-me",
		locale: locale as "en" | "pl",
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
