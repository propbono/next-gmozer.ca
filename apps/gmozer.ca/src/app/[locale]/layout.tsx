import { Toaster, TooltipProvider } from "@gmozer/ui";
import { cn } from "@gmozer/utils";
import { Ubuntu } from "next/font/google"; // Keep existing imports
import { notFound } from "next/navigation";
import Script from "next/script";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import {
	getMessages,
	getTranslations,
	setRequestLocale,
} from "next-intl/server";
import type { ReactNode } from "react";
import PostHogPageView from "@/components/posthog-pageview"; // Added import
import { ThemeProvider } from "@/components/theme-provider"; // Verify path
import { routing } from "@/i18n/routing";

import "../globals.css";

const ubuntu = Ubuntu({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	variable: "--font-ubuntu",
});

export async function generateMetadata() {
	const t = await getTranslations("metadata");

	return {
		title: t("default.title"),
		description: t("default.description"),
		openGraph: {
			title: t("default.title"),
			description: t("default.description"),
			type: "website",
			siteName: t("default.siteName"),
			url: t("default.url"),
		},
		twitter: {
			card: "summary_large_image",
			title: t("default.title"),
			description: t("default.description"),
		},
		metadataBase: new URL(t("default.url")),
	};
}

export default async function RootLayout({
	children,
	params,
}: Readonly<{ children: ReactNode; params: Promise<{ locale: string }> }>) {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	setRequestLocale(locale);
	const messages = await getMessages();
	const t = await getTranslations("metadata");

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: t("default.name"),
		jobTitle: t("default.jobTitle"),
		url: `https://gmozer.ca/${locale}`,
		sameAs: [
			"https://github.com/propbono/",
			"https://www.linkedin.com/in/greg-mozer/",
		],
		skills: ["React", "TypeScript", "Next.js", "Node.js"],
		worksFor: {
			"@type": "Organization",
			name: "Heineken",
		},
	};

	return (
		<html lang={locale} suppressHydrationWarning>
			<head>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/favicon-16x16.png"
				/>
				<link rel="manifest" href="/site.webmanifest" />
				<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
				<meta name="msapplication-TileColor" content="#da532c" />
				<meta name="theme-color" content="#ffffff" />
			</head>
			<body
				className={cn("flex flex-col min-h-screen min-w-72", ubuntu.variable)}
			>
				<NextIntlClientProvider messages={messages}>
					<PostHogPageView />
					<ThemeProvider>
						<TooltipProvider delayDuration={150}>{children}</TooltipProvider>
					</ThemeProvider>

					<Toaster />
					<Script type="application/ld+json">{JSON.stringify(jsonLd)}</Script>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}
