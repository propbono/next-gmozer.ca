import { Separator } from "@gmozer/ui";
import { getTranslations } from "next-intl/server";
import { RiArrowRightDownLine } from "react-icons/ri";
import { AnimatedElement } from "@/components/animated-element/animated-element";
import { Link } from "@/i18n/navigation";

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

	return (
		<article className="container" aria-label={t("srTitle")}>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-16">
				<ServiceCard
					index={1}
					url={nav("web-development.url")}
					title={t("webDevelopment.title")}
					description={t("webDevelopment.description")}
				/>

				<ServiceCard
					index={2}
					url={nav("ui-ux-design.url")}
					title={t("uiUxDesign.title")}
					description={t("uiUxDesign.description")}
				/>

				<ServiceCard
					index={3}
					url={nav("logo-design.url")}
					title={t("logoDesign.title")}
					description={t("logoDesign.description")}
				/>
				<ServiceCard
					index={4}
					url={nav("seo-optimization.url")}
					title={t("seoOptimization.title")}
					description={t("seoOptimization.description")}
				/>
				<ServiceCard
					index={5}
					url={nav("mobile-development.url")}
					title={t("mobileAppDevelopment.title")}
					description={t("mobileAppDevelopment.description")}
					hasSeparator={false}
				/>
			</div>
		</article>
	);
}

const ServiceCard = ({
	index,
	url,
	title,
	description,
	hasSeparator = true,
}: {
	index: number;
	url: string;
	title: string;
	description: string;
	hasSeparator?: boolean;
}) => {
	return (
		<Link href={url} className="group">
			<AnimatedElement
				index={index}
				transition={{ duration: 0.5, delay: index * 0.2 }}
				className="flex flex-1 flex-col justify-center gap-6"
			>
				<div className="flex w-full justify-between items-center text-5xl font-extrabold">
					<span className="hover:text-primary text-5xl group-hover:text-primary transition-all delay-100 duration-500">
						{index.toString().padStart(2, "0")}
					</span>
					<span className="size-11 flex items-center justify-center border-foreground border rounded-full hover:border-primary text-3xl hover:-rotate-45 group-hover:-rotate-45 hover:text-primary group-hover:border-primary group-hover:text-primary transition-all delay-100 duration-500">
						<RiArrowRightDownLine />
						<span className="sr-only">{title}</span>
					</span>
				</div>

				<h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-all duration-500">
					{title}
				</h3>
				<p className="text-lg leading-snug">{description}</p>
				{hasSeparator && <Separator />}
			</AnimatedElement>
		</Link>
	);
};
