"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LuImageOff } from "react-icons/lu";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { PROJECT_KEYS } from "@/constants/main";
import { useElementSize } from "@/hooks/use-element-size";
import { isStringArray } from "@/lib/utils";
import type { Project } from "@/types/work";
import { ProjectCard } from "./project-card";

export function ProjectShowcase() {
	const [api, setApi] = useState<CarouselApi>();
	const [_current, setCurrent] = useState(0);
	const [_count, setCount] = useState(0);
	const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
	const [ref, { height }] = useElementSize();
	const t = useTranslations("work");

	const projects: Project[] = useMemo(() => {
		return PROJECT_KEYS.map((key) => {
			return {
				title: t(`projects.${key}.title`),
				category: t(`projects.${key}.category`),
				description: t(`projects.${key}.description`),
				liveLink: t.has(`projects.${key}.liveLink`)
					? t(`projects.${key}.liveLink`)
					: undefined,
				githubLink: t(`projects.${key}.githubLink`),
				stack:
					t.has(`projects.${key}.stack`) &&
					isStringArray(t.raw(`projects.${key}.stack`))
						? t.raw(`projects.${key}.stack`)
						: [],
				image: t.has(`projects.${key}.image`)
					? t(`projects.${key}.image`)
					: undefined,
			};
		});
	}, [t]);

	const currentProject = useMemo(
		() => projects[currentProjectIndex],
		[currentProjectIndex, projects],
	);

	useEffect(() => {
		if (!api) return;

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on("select", () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	const handleNext = useCallback(() => {
		if (api?.canScrollNext()) {
			api.scrollNext();
			setCurrentProjectIndex((prev) => prev + 1);
		}
	}, [api]);

	const handlePrevious = useCallback(() => {
		if (api?.canScrollPrev()) {
			api.scrollPrev();
			setCurrentProjectIndex((prev) => prev - 1);
		}
	}, [api]);

	return (
		<article className="flex flex-grow relative">
			<div
				ref={ref}
				className="hidden sm:block absolute md:rounded-s-lg w-full md:w-[768px] lg:w-[872px] xl:w-[1024px] 2xl:w-[1124px] h-full top-0 right-0"
			>
				<Carousel setApi={setApi} className="h-full">
					<CarouselContent className="h-full">
						{projects?.length > 0 &&
							projects.map((item, index) => (
								<CarouselItem key={item.title} className="h-full">
									<div
										className="relative w-full h-full bg-muted/30 md:rounded-s-lg overflow-hidden"
										style={{ height: `${height}px` }}
									>
										{item.image ? (
											<Image
												src={item.image}
												alt={item.title}
												fill
												className="object-cover md:rounded-s-lg"
												sizes="(max-width: 1024px) 100vw, 50vw"
												priority={index === 0}
											/>
										) : (
											<div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground bg-muted">
												<LuImageOff className="size-16 mb-4 opacity-50" />
												<span className="text-lg font-medium">
													{t("noImage")}
												</span>
											</div>
										)}
									</div>
								</CarouselItem>
							))}
					</CarouselContent>
				</Carousel>
			</div>
			<div className="container flex flex-grow items-center justify-start">
				<ProjectCard
					project={currentProject}
					index={currentProjectIndex}
					onNext={handleNext}
					onPrevious={handlePrevious}
					canNext={!!api?.canScrollNext()}
					canPrevious={!!api?.canScrollPrev()}
				/>
			</div>
		</article>
	);
}
