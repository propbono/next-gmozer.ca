import {
	Button,
	CallToActionCard,
	CheckCircleWithText,
	NumberItem,
	PageSection,
	ServiceCard,
} from "@gmozer/ui";
import { getTranslations } from "next-intl/server";
import {
	LuCircleCheck,
	LuCode,
	LuLayers,
	LuServer,
	LuWorkflow,
} from "react-icons/lu";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { Link } from "@/i18n/navigation";

export async function generateMetadata() {
	const t = await getTranslations("metadata");

	return {
		title: t("services.web-development.title"),
		description: t("services.web-development.description"),
		openGraph: {
			title: t("services.web-development.title"),
			description: t("services.web-development.description"),
			images: [{ url: t("default.image") }],
			type: "website",
			siteName: t("default.siteName"),
			url: t("services.web-development.url"),
		},
		twitter: {
			card: "summary_large_image",
			title: t("services.web-development.title"),
			description: t("services.web-development.description"),
			images: [t("default.image")],
		},
		metadataBase: new URL(t("default.url")),
	};
}

export default async function WebDevelopment() {
	const t = await getTranslations("services.webDevelopment.content");
	const nav = await getTranslations("navigation");

	return (
		<article className="container">
			<BreadcrumbNav />
			<header>
				<h1 className="text-4xl font-bold mb-6">{t("title")}</h1>
			</header>
			<div className="grid gap-16">
				<PageSection
					id="offerings"
					title={t("offerings.title")}
					description={t("offerings.description")}
				>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
						<ServiceCard
							title={t("offerings.point1.title")}
							description={t("offerings.point1.description")}
							icon={<LuCode className="size-6 text-primary" />}
							hasSecondChevronIcon={false}
						/>
						<ServiceCard
							title={t("offerings.point2.title")}
							description={t("offerings.point2.description")}
							icon={<LuLayers className="size-6 text-primary" />}
							hasSecondChevronIcon={false}
						/>
						<ServiceCard
							title={t("offerings.point3.title")}
							description={t("offerings.point3.description")}
							icon={<LuServer className="size-6 text-primary" />}
							hasSecondChevronIcon={false}
						/>
						<ServiceCard
							title={t("offerings.point4.title")}
							description={t("offerings.point4.description")}
							icon={<LuWorkflow className="size-6 text-primary" />}
							hasSecondChevronIcon={false}
						/>
						<ServiceCard
							title={t("offerings.point5.title")}
							description={t("offerings.point5.description")}
							icon={<LuCircleCheck className="size-6 text-primary" />}
							hasSecondChevronIcon={false}
						/>
						<ServiceCard
							title={t("offerings.point5.title")}
							description={t("offerings.point5.description")}
							icon={<LuLayers className="size-6 text-primary" />}
							hasSecondChevronIcon={false}
						/>
					</div>
					<div className="grid grid-cols-3 gap-4">
						<CheckCircleWithText text={t("offerings.point7")} />
						<CheckCircleWithText text={t("offerings.point8")} />
						<CheckCircleWithText text={t("offerings.point9")} />
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
						/>
						<NumberItem
							number={5}
							title={t("process.point5.title")}
							description={t("process.point5.description")}
							isLastItem={true}
						/>
					</div>
				</PageSection>
				<section aria-labelledby="cta">
					<CallToActionCard
						title={t("cta.title")}
						description={t("cta.description")}
						action={
							<Button
								size="lg"
								className="bg-primary hover:bg-primary-foreground text-primary-foreground hover:text-primary"
								asChild
							>
								<Link href={nav("contact.default.url")}>{t("cta.button")}</Link>
							</Button>
						}
					/>
				</section>
				<PageSection
					id="technologies"
					title={t("technologies.title")}
					description={t("technologies.description")}
				>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<ServiceCard
							title={t("technologies.point1.title")}
							description={t("technologies.point1.description")}
							icon={<LuCode className="h-5 w-5 text-primary" />}
						/>
						<ServiceCard
							title={t("technologies.point2.title")}
							description={t("technologies.point2.description")}
							icon={<LuServer className="h-5 w-5 text-primary" />}
						/>
						<ServiceCard
							title={t("technologies.point3.title")}
							description={t("technologies.point3.description")}
							icon={<LuWorkflow className="h-5 w-5 text-primary" />}
						/>
						<ServiceCard
							title={t("technologies.point4.title")}
							description={t("technologies.point4.description")}
							icon={<LuCircleCheck className="h-5 w-5 text-primary" />}
						/>
					</div>
				</PageSection>
			</div>
		</article>
	);
}
