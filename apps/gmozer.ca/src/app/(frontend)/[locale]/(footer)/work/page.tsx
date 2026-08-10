import { getTranslations } from "next-intl/server";
import { ProjectShowcase } from "@/components/project-showcase";

export default async function Work() {
	const t = await getTranslations("work");

	return (
		<div className="container py-12">
			<h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
				{t("pageTitle")}
			</h1>
			<ProjectShowcase />
		</div>
	);
}

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
