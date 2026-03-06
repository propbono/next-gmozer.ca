import { getTranslations } from "next-intl/server";
import {
	RiCodeSSlashLine,
	RiLayoutLine,
	RiPenNibLine,
	RiSearchLine,
	RiSmartphoneLine,
} from "react-icons/ri";
import {
	type ServiceItem,
	ServicesSection,
} from "@/components/services-section";

export async function generateMetadata() {
	const t = await getTranslations("metadata");

	return {
		title: t("services.default.title"),
		description: t("services.default.description"),
		openGraph: {
			title: t("services.default.title"),
			description: t("services.default.description"),
			images: [{ url: t("default.image") }],
			type: "website",
			siteName: t("default.siteName"),
			url: t("services.default.url"),
		},
		twitter: {
			card: "summary_large_image",
			title: t("services.default.title"),
			description: t("services.default.description"),
			images: [t("default.image")],
		},
		metadataBase: new URL(t("default.url")),
	};
}

export default async function Services() {
	const t = await getTranslations("services");
	const nav = await getTranslations("navigation.services.children");

	const services: ServiceItem[] = [
		{
			title: t("webDevelopment.title"),
			description: t("webDevelopment.description"),
			url: nav("web-development.url"),
			icon: <RiCodeSSlashLine className="size-10" />,
		},
		{
			title: t("uiUxDesign.title"),
			description: t("uiUxDesign.description"),
			url: nav("ui-ux-design.url"),
			icon: <RiLayoutLine className="size-10" />,
		},
		{
			title: t("logoDesign.title"),
			description: t("logoDesign.description"),
			url: nav("logo-design.url"),
			icon: <RiPenNibLine className="size-10" />,
		},
		{
			title: t("seoOptimization.title"),
			description: t("seoOptimization.description"),
			url: nav("seo-optimization.url"),
			icon: <RiSearchLine className="size-10" />,
		},
		{
			title: t("mobileAppDevelopment.title"),
			description: t("mobileAppDevelopment.description"),
			url: nav("mobile-development.url"),
			icon: <RiSmartphoneLine className="size-10" />,
		},
	];

	return (
		<article className="container py-12" aria-label={t("srTitle")}>
			<ServicesSection services={services} />
		</article>
	);
}
