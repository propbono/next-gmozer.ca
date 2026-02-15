import { Ubuntu } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

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
	const t = await getTranslations("metadata");
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) {
		notFound();
	}

	setRequestLocale(locale);

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
			</head>
			<body
				className={cn("flex flex-col min-h-screen min-w-72", ubuntu.variable)}
			>
				<NextIntlClientProvider>
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
