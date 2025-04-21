import { constructMetadata } from "@/app/metadata";
import { BreadcrumbNav } from "@/components/breadcrumbs";
import { NumberItem } from "@/components/number-item";
import { ServiceCard } from "@/components/service-card";
import { useTranslations } from "next-intl";

export const metadata = constructMetadata({
	title: "UI/UX Design Services | Greg Mozer",
	description:
		"Crafting intuitive and engaging user interfaces that deliver exceptional user experiences while maintaining accessibility standards.",
});

export default function UiUxDesign() {
	const t = useTranslations("services.uiUxDesign.content");

	return (
		<article className="container">
			<BreadcrumbNav />
			<header>
				<h1 className="text-4xl font-bold mb-6">{t("title")}</h1>
			</header>
			<div className="grid gap-16">
				<section aria-labelledby="philosophy">
					<h2 className="text-2xl font-semibold mb-4">
						{t("philosophy.title")}
					</h2>
					<p className="text-muted-foreground mb-4">
						{t("philosophy.description")}
					</p>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
						<ServiceCard
							title={t("philosophy.point1.title")}
							description={t("philosophy.point1.description")}
							hasSecondChevronIcon={false}
						/>
						<ServiceCard
							title={t("philosophy.point2.title")}
							description={t("philosophy.point2.description")}
							hasSecondChevronIcon={false}
						/>
						<ServiceCard
							title={t("philosophy.point3.title")}
							description={t("philosophy.point3.description")}
							hasSecondChevronIcon={false}
						/>
						<ServiceCard
							title={t("philosophy.point4.title")}
							description={t("philosophy.point4.description")}
							hasSecondChevronIcon={false}
						/>
						<ServiceCard
							title={t("philosophy.point5.title")}
							description={t("philosophy.point5.description")}
							hasSecondChevronIcon={false}
						/>
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
							isLastItem={true}
						/>
					</div>
				</section>

				<section aria-labelledby="tools">
					<h2 className="text-2xl font-semibold mb-4">{t("tools.title")}</h2>
					<p className="text-muted-foreground mb-4">{t("tools.description")}</p>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						<ServiceCard
							title={t("tools.point1.title")}
							description={t("tools.point1.description")}
						/>
						<ServiceCard
							title={t("tools.point2.title")}
							description={t("tools.point2.description")}
						/>
						<ServiceCard
							title={t("tools.point3.title")}
							description={t("tools.point3.description")}
						/>
					</div>
				</section>
			</div>
		</article>
	);
}
