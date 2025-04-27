import { ContactForm } from "@/components/contact-form";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function generateMetadata() {
	const t = await getTranslations("metadata");

	return {
		title: t("contact.title"),
		description: t("contact.description"),
		openGraph: {
			title: t("contact.title"),
			description: t("contact.description"),
			images: [{ url: t("default.image") }],
			type: "website",
			siteName: t("default.siteName"),
			url: t("contact.url"),
		},
		twitter: {
			card: "summary_large_image",
			title: t("contact.title"),
			description: t("contact.description"),
			images: [t("default.image")],
		},
		metadataBase: new URL(t("default.url")),
	};
}

export default async function ContactPage() {
	const t = await getTranslations("contact");

	return (
		<article className="container flex flex-grow">
			<div className="w-full">
				<div className="grid gap-8 grid-cols-1 md:grid-cols-2 sm:px-16 py-16 mx-auto text-foreground">
					<section
						className="flex flex-col h-full"
						aria-labelledby="contact-heading"
					>
						<div>
							<h1
								id="contact-heading"
								className="w-full mb-4 2xl:mb-6 font-logo text-4xl md:text-5xl font-bold leading-relaxed"
							>
								{t.rich("title", {
									span: (chunks) => (
										<span className="text-primary">{chunks}</span>
									),
								})}
							</h1>
							<p className="text-muted-foreground mt-8">
								{t.rich("cta", {
									a: (chunks) => (
										<a href={`mailto:${chunks}`} className="underline">
											{chunks}
										</a>
									),
								})}
							</p>
						</div>
						<figure className="relative w-full flex-grow max-h-[400px] mt-4 rounded-ss-2xl">
							<Image
								src="/images/The-whole-world.png"
								alt="World illustration"
								fill
								sizes="(max-width: 768px) 100vw, 50vw"
								className="object-cover object-bottom rounded-ss-2xl"
								priority
							/>
						</figure>
					</section>
					<section aria-labelledby="contact-form">
						<ContactForm />
					</section>
				</div>
			</div>
		</article>
	);
}
