import { constructMetadata } from "@/app/metadata";
import { AnimatedElement } from "@/components/animated-element/animated-element";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EXPERIENCE } from "@/constants/resume";

export const metadata = constructMetadata({
	title: "Professional Experience | Greg Mozer",
	description:
		"View my professional timeline, work history, and achievements as a Senior Fullstack Engineer working with cutting-edge technologies.",
});

export default function Experience() {
	return (
		<section className="flex flex-col gap-8">
			<header className="flex flex-col gap-8 text-center md:text-left">
				<h1 className="text-4xl font-bold">{EXPERIENCE.title}</h1>
				<p className="max-w-xl mx-auto md:mx-0 text-muted-foreground">
					{EXPERIENCE.description}
				</p>
			</header>
			<ScrollArea className="h-[400px] 2xl:h-[600px]">
				<div
					className="grid grid-cols-1 gap-8 md:grid-cols-2"
					aria-label="Experience timeline"
				>
					{EXPERIENCE.items.map((item, index) => (
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
									<span className="rounded-full size-2 bg-primary"></span>
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
