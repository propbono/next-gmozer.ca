import { getTranslations } from "next-intl/server";
import { getAbout } from "@/lib/get-about";

export async function generateMetadata() {
	const t = await getTranslations("metadata");

	return {
		title: t("resume.about.title"),
		description: t("resume.about.description"),
		openGraph: {
			title: t("resume.about.title"),
			description: t("resume.about.description"),
			images: [{ url: t("default.image") }],
			type: "website",
			siteName: t("default.siteName"),
			url: t("resume.about.url"),
		},
		twitter: {
			card: "summary_large_image",
			title: t("resume.about.title"),
			description: t("resume.about.description"),
			images: [t("default.image")],
		},
		metadataBase: new URL(t("default.url")),
	};
}

export default async function About() {
	const t = await getTranslations("resume.about");
	const aboutData = await getAbout();

	const aboutItems = [
		{ name: t("items.name.label"), value: aboutData.items.name },
		{ name: t("items.phone.label"), value: aboutData.items.phone },
		{ name: t("items.email.label"), value: aboutData.items.email },
		{ name: t("items.location.label"), value: aboutData.items.location },
		{
			name: t("items.nationality.label"),
			value: aboutData.items.nationality,
		},
		{ name: t("items.languages.label"), value: aboutData.items.languages },
	];

	return (
		<section className="flex flex-col gap-8">
			<header className="flex flex-col gap-8 text-center md:text-left">
				<h1 className="font-bold text-4xl">{aboutData.title}</h1>
				<p className="max-w-3xl mx-auto leading-relaxed md:mx-0 text-muted-foreground">
					{aboutData.description}
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
