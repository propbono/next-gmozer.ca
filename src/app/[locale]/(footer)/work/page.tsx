import { ProjectShowcase } from "@/components/project-showcase";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
	const t = await getTranslations("metadata");

	return {
		title: t("work.title"),
		description: t("work.description"),
		openGraph: {
			title: t("work.title"),
			description: t("work.description"),
			images: [{ url: t("default.image") }],
			type: "website",
			siteName: t("default.siteName"),
			url: t("work.url"),
		},
		twitter: {
			card: "summary_large_image",
			title: t("work.title"),
			description: t("work.description"),
			images: [t("default.image")],
		},
		metadataBase: new URL(t("default.url")),
	};
}

export default function Work() {
	return <ProjectShowcase />;
}
