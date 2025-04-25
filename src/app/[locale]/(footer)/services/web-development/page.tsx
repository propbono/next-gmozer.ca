import { constructMetadata } from "@/app/metadata";
import { BreadcrumbNav } from "@/components/breadcrumbs";
import { CallToActionCard } from "@/components/call-to-action-card";
import { CheckCircleWithText } from "@/components/check-circle-with-text";
import { NumberItem } from "@/components/number-item";
import { ServiceCard } from "@/components/service-card";
import { useTranslations } from "next-intl";
import {
	LuCircleCheck,
	LuCode,
	LuLayers,
	LuServer,
	LuWorkflow,
} from "react-icons/lu";

export const metadata = constructMetadata({
	title: "Web Development Services | Greg Mozer",
	description:
		"Building high-performance, scalable web applications with modern frameworks and best practices in mind.",
});

export default function WebDevelopment() {
	const t = useTranslations("services.webDevelopment.content");
	const nav = useTranslations("navigation");

	return (
		<article className="container">
			<BreadcrumbNav />
			<header>
				<h1 className="text-4xl font-bold mb-6">{t("title")}</h1>
			</header>
			<div className="grid gap-16">
				<section aria-labelledby="offerings">
					<h2 className="text-2xl font-semibold mb-4">
						{t("offerings.title")}
					</h2>
					<p className="text-muted-foreground mb-4">
						{t("offerings.description")}
					</p>
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
				</section>

				<section aria-labelledby="process">
					<h2 className="text-2xl font-semibold mb-4">{t("process.title")}</h2>
					<p className="text-muted-foreground mb-4">
						{t("process.description")}
					</p>
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
				</section>
				<section aria-labelledby="cta">
					<CallToActionCard
						ctaTitle={t("cta.title")}
						ctaDescription={t("cta.description")}
						ctaUrl={nav("contact.default.url")}
						ctaUrlText={t("cta.button")}
					/>
				</section>
				<section aria-labelledby="technologies">
					<h2 className="text-2xl font-semibold mb-4">
						{t("technologies.title")}
					</h2>
					<p className="text-muted-foreground mb-4">
						{t("technologies.description")}
					</p>

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
				</section>
			</div>
		</article>
	);
}
