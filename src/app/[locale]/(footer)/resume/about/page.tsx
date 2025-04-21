import { constructMetadata } from "@/app/metadata";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export const metadata = constructMetadata({
	title: "About Me | Greg Mozer",
	description:
		"Learn about my professional journey, skills, and experience as a Senior Fullstack Engineer specializing in modern web technologies.",
});

export default function About() {
	const t = useTranslations("resume.about");
	const aboutItems = useMemo(() => {
		return [
			{ name: t("items.name.label"), value: t("items.name.value") },
			{ name: t("items.phone.label"), value: t("items.phone.value") },
			{ name: t("items.email.label"), value: t("items.email.value") },
			{ name: t("items.location.label"), value: t("items.location.value") },
			{
				name: t("items.nationality.label"),
				value: t("items.nationality.value"),
			},
			{ name: t("items.languages.label"), value: t("items.languages.value") },
		];
	}, [t]);

	return (
		<section className="flex flex-col gap-8">
			<header className="flex flex-col gap-8 text-center md:text-left">
				<h1 className="font-bold text-4xl">{t("title")}</h1>
				<p className="max-w-3xl mx-auto leading-relaxed md:mx-0 text-muted-foreground">
					{t("description")}
				</p>
			</header>
			<ul
				className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto md:mx-0"
				aria-label="Personal details"
			>
				{aboutItems.map((item) => (
					<li
						key={item.name}
						className="flex gap-4 justify-center md:justify-start items-center"
					>
						<span className="font-semibold">{item.name}</span>
						<span className="font-bold text-muted-foreground text-xl">
							{item.value}
						</span>
					</li>
				))}
			</ul>
		</section>
	);
}
