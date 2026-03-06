import {
	BreadcrumbNav,
	CheckCircleWithText,
	NumberItem,
	PageSection,
} from "@gmozer/ui";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
	const t = await getTranslations("metadata");

	return {
		title: t("services.mobile-app-development.title"),
		description: t("services.mobile-app-development.description"),
		openGraph: {
			title: t("services.mobile-app-development.title"),
			description: t("services.mobile-app-development.description"),
			images: [{ url: t("default.image") }],
			type: "website",
			siteName: t("default.siteName"),
			url: t("services.mobile-app-development.url"),
		},
		twitter: {
			card: "summary_large_image",
			title: t("services.mobile-app-development.title"),
			description: t("services.mobile-app-development.description"),
			images: [t("default.image")],
		},
		metadataBase: new URL(t("default.url")),
	};
}

export default async function MobileAppDevelopment() {
	const t = await getTranslations("services.mobileAppDevelopment.content");
	const nav = await getTranslations("navigation");

	return (
		<article className="container">
			<BreadcrumbNav
				items={[
					{
						label: nav("home.default.title"),
						href: nav("home.default.url"),
					},
					{
						label: nav("services.default.title"),
						href: nav("services.default.url"),
					},
					{
						label: nav("services.children.mobile-development.title"),
						href: nav("services.children.mobile-development.url"),
					},
				]}
			/>
			<header>
				<h1 className="text-4xl font-bold mb-6">{t("title")}</h1>
			</header>
			<div className="grid gap-16">
				<PageSection
					id="solutions"
					title={t("solutions.title")}
					description={t("solutions.description")}
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<CheckCircleWithText text={t("solutions.point1")} />
						<CheckCircleWithText text={t("solutions.point2")} />
						<CheckCircleWithText text={t("solutions.point3")} />
						<CheckCircleWithText text={t("solutions.point4")} />
						<CheckCircleWithText text={t("solutions.point5")} />
						<CheckCircleWithText text={t("solutions.point6")} />
					</div>
				</PageSection>

				<PageSection
					id="process"
					title={t("process.title")}
					description={t("process.description")}
				>
					<div className="space-y-8">
						<NumberItem
							number={1}
							title={t("process.point1.title")}
							description={t("process.point1.description")}
						/>
						<NumberItem
							number={2}
							title={t("process.point2.title")}
							description={t("process.point2.description")}
						/>
						<NumberItem
							number={3}
							title={t("process.point3.title")}
							description={t("process.point3.description")}
						/>
						<NumberItem
							number={4}
							title={t("process.point4.title")}
							description={t("process.point4.description")}
							isLastItem={true}
						/>
					</div>
				</PageSection>
			</div>
		</article>
	);
}
