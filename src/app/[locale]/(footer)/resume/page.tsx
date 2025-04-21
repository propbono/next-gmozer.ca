import { constructMetadata } from "@/app/metadata";
import { AnimatedElement } from "@/components/animated-element/animated-element";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export const metadata = constructMetadata({
	title: "Professional Experience | Greg Mozer",
	description:
		"View my professional timeline, work history, and achievements as a Senior Fullstack Engineer working with cutting-edge technologies.",
});

export default function Experience() {
	const t = useTranslations("resume.experience");

	const positions = useMemo(() => {
		return [
			{
				position: t("positions.heineken.position"),
				company: t("positions.heineken.company"),
				location: t("positions.heineken.location"),
				duration: t("positions.heineken.duration"),
			},
			{
				position: t("positions.rangle.position"),
				company: t("positions.rangle.company"),
				location: t("positions.rangle.location"),
				duration: t("positions.rangle.duration"),
			},
			{
				position: t("positions.cgi2.position"),
				company: t("positions.cgi2.company"),
				location: t("positions.cgi2.location"),
				duration: t("positions.cgi2.duration"),
			},
			{
				position: t("positions.cgi1.position"),
				company: t("positions.cgi1.company"),
				location: t("positions.cgi1.location"),
				duration: t("positions.cgi1.duration"),
			},
			{
				position: t("positions.dcm2.position"),
				company: t("positions.dcm2.company"),
				location: t("positions.dcm2.location"),
				duration: t("positions.dcm2.duration"),
			},
			{
				position: t("positions.dcm1.position"),
				company: t("positions.dcm1.company"),
				location: t("positions.dcm1.location"),
				duration: t("positions.dcm1.duration"),
			},
		];
	}, [t]);

	return (
		<section className="flex flex-col gap-8">
			<header className="flex flex-col gap-8 text-center md:text-left">
				<h1 className="text-4xl font-bold">{t("title")}</h1>
				<p className="max-w-xl mx-auto md:mx-0 text-muted-foreground">
					{t("description")}
				</p>
			</header>
			<ScrollArea>
				<div
					className="grid grid-cols-1 gap-8 md:grid-cols-2"
					aria-label="Experience timeline"
				>
					{positions.map((item, index) => (
						<AnimatedElement key={`${item.company}-${index}`} index={index}>
							<Card>
								<CardHeader>
									<time className="text-primary font-semibold">
										{item.duration}
									</time>
								</CardHeader>
								<CardContent className="flex justify-center md:justify-start">
									<h2 className="text-xl max-w-64 min-h-14 w-full text-center md:text-left font-bold">
										{item.position}
									</h2>
								</CardContent>
								<CardFooter className="flex flex-wrap items-center justify-center md:justify-start gap-2">
									<span className="rounded-full size-2 bg-primary" />
									<span>{item.company}</span>
								</CardFooter>
							</Card>
						</AnimatedElement>
					))}
				</div>
			</ScrollArea>
		</section>
	);
}
