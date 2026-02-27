import { CheckCircleWithText, NumberItem, PageSection } from "@gmozer/ui";
import { getTranslations } from "next-intl/server";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";

export async function generateMetadata() {
	const t = await getTranslations("metadata");

	return {
		title: t("services.logo-design.title"),
		description: t("services.logo-design.description"),
		openGraph: {
			title: t("services.logo-design.title"),
			description: t("services.logo-design.description"),
			images: [{ url: t("default.image") }],
			type: "website",
			siteName: t("default.siteName"),
			url: t("services.logo-design.url"),
		},
		twitter: {
			card: "summary_large_image",
			title: t("services.logo-design.title"),
			description: t("services.logo-design.description"),
			images: [t("default.image")],
		},
		metadataBase: new URL(t("default.url")),
	};
}

export default async function LogoDesign() {
	const t = await getTranslations("services.logoDesign.content");

	return (
		<article className="container">
			<BreadcrumbNav />
			<header>
				<h1 className="text-4xl font-bold mb-6">{t("title")}</h1>
			</header>
			<div className="grid gap-16">
				<PageSection
					id="brand-identity"
					title={t("brand-identity.title")}
					description={t("brand-identity.description")}
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<CheckCircleWithText text={t("brand-identity.point1")} />
						<CheckCircleWithText text={t("brand-identity.point2")} />
						<CheckCircleWithText text={t("brand-identity.point3")} />
						<CheckCircleWithText text={t("brand-identity.point4")} />
						<CheckCircleWithText text={t("brand-identity.point5")} />
						<CheckCircleWithText text={t("brand-identity.point6")} />
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
