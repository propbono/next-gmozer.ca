import { constructMetadata } from "@/app/metadata";
import { AnimatedElement } from "@/components/animated-element/animated-element";
import { Separator } from "@/components/ui/separator";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { RiArrowRightDownLine } from "react-icons/ri";

export const metadata = constructMetadata({
	title: "Services | Greg Mozer",
	description:
		"Comprehensive web development services including frontend development, UI/UX design, SEO optimization, and mobile app development.",
});

export default function Services() {
	const t = useTranslations("services");
	const nav = useTranslations("navigation.services.children");

	return (
		<article className="container">
			<div
				className="grid grid-cols-1 md:grid-cols-2 gap-16"
				aria-label={t("srTitle")}
			>
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
