import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { constructMetadata } from "@/app/metadata";
import { siteConfig } from "./metadata";
import Script from "next/script";
import { PostHogProvider } from "@/components/posthog-provider";

const ubuntu = Ubuntu({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	variable: "--font-ubuntu",
});

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: siteConfig.name,
	jobTitle: "Senior Fullstack Engineer",
	url: siteConfig.url,
	sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
	skills: ["React", "TypeScript", "Next.js", "Node.js"],
	worksFor: {
		"@type": "Organization",
		name: "Heineken",
	},
};

export const metadata = constructMetadata({
	title: "Greg Mozer | Senior Fullstack Engineer",
	description:
		"Building high-performance web applications with modern technologies",
});

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en">
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
				<PostHogProvider>
					<TooltipProvider delayDuration={150}>{children}</TooltipProvider>
					<Toaster />
					<Script type="application/ld+json">{JSON.stringify(jsonLd)}</Script>
				</PostHogProvider>
			</body>
		</html>
	);
}
