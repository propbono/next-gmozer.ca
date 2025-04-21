import { constructMetadata } from "@/app/metadata";
import { BreadcrumbNav } from "@/components/breadcrumbs";
import { CheckCircleWithText } from "@/components/check-circle-with-text";
import { NumberItem } from "@/components/number-item";
import { useTranslations } from "next-intl";

export const metadata = constructMetadata({
	title: "Logo Design Services | Greg Mozer",
	description:
		"Creating distinctive and memorable brand identities that resonate with target audiences and stand the test of time.",
});

export default function LogoDesign() {
	const t = useTranslations("services.logoDesign.content");

	return (
		<article className="container">
			<BreadcrumbNav />
			<header>
				<h1 className="text-4xl font-bold mb-6">{t("title")}</h1>
			</header>
			<div className="grid gap-16">
				<section aria-labelledby="brand-identity">
					<h2 className="text-2xl font-semibold mb-4">
						{t("brand-identity.title")}
					</h2>
					<p className="text-muted-foreground mb-4">
						{t("brand-identity.description")}
					</p>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<CheckCircleWithText text={t("brand-identity.point1")} />
						<CheckCircleWithText text={t("brand-identity.point2")} />
						<CheckCircleWithText text={t("brand-identity.point3")} />
						<CheckCircleWithText text={t("brand-identity.point4")} />
						<CheckCircleWithText text={t("brand-identity.point5")} />
						<CheckCircleWithText text={t("brand-identity.point6")} />
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
			</div>
		</article>
	);
}
