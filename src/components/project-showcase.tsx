"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { useElementSize } from "@/hooks/use-element-size";
import { isStringArray } from "@/lib/utils";
import type { Project } from "@/types/work";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
	RiArrowLeftSLine,
	RiArrowRightDownLine,
	RiArrowRightSLine,
	RiGithubLine,
} from "react-icons/ri";

import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "./ui/card";

export function ProjectShowcase() {
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);
	const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
	const [ref, { width, height }] = useElementSize();
	const t = useTranslations("work");

	const projectKeys = [
		"project1",
		"project2",
		"project3",
		"project4",
		"project5",
		"project6",
	] as const;

	const projects: Project[] = useMemo(() => {
		return projectKeys.map((key) => {
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
	}, [t, projectKeys]);

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
										className="relative w-full h-full"
										style={{ height: `${height}px` }}
									>
										{/* TODO: if no image display placeholder image */}
										{item.image && (
											<Image
												src={item.image}
												alt={item.title}
												fill
												className="object-cover md:rounded-s-lg"
												sizes="(max-width: 1024px) 100vw, 50vw"
												priority={index === 0}
											/>
										)}
									</div>
								</CarouselItem>
							))}
					</CarouselContent>
				</Carousel>
			</div>
			<div className="container flex flex-grow items-center justify-start">
				<Card className="w-full sm:w-[672px] h-[600px] z-10 shadow-lg shadow-white/75">
					<CardContent className="h-full flex flex-col p-6">
						<div className="flex-shrink-0">
							<span className="text-8xl leading-none font-extrabold text-primary mb-8 block">
								{(currentProjectIndex + 1).toString().padStart(2, "0")}
							</span>
							<h1
								id="project-title"
								className="leading-tight font-bold text-4xl sm:text-5xl text-card-foreground group-hover:text-primary transition-all duration-500 capitalize mb-6 line-clamp-2"
							>
								{currentProject.title}
							</h1>
							<h2 className="leading-none font-medium text-2x mb-4">
								{currentProject.category}
							</h2>
						</div>

						<div className="flex-grow flex flex-col justify-between min-h-0">
							<span className="text-muted-foreground mb-4 line-clamp-2">
								{currentProject.description}
							</span>

							<div className="flex flex-wrap gap-2 overflow-y-auto max-h-24 mb-4">
								{currentProject.stack.map((stack) => (
									<Badge
										className="bg-secondary text-secondary-foreground flex-shrink-0"
										key={stack}
									>
										{stack}
									</Badge>
								))}
							</div>
						</div>

						<div className="flex-shrink-0 mt-auto pt-4">
							<Separator className="mb-4" />
							<div className="flex flex-row justify-between gap-4">
								<div className="flex gap-4 items-center">
									{!!currentProject.liveLink && (
										<Link href={currentProject.liveLink}>
											<Tooltip>
												<TooltipTrigger className="size-16 rounded-full border border-card-foreground flex justify-center items-center group hover:border-primary hover:border-2 hover:border-dashed hover:transition-all hover:duration-100">
													<RiArrowRightDownLine className="text-3xl text-card-foreground group-hover:text-primary group-hover:-rotate-45 transition-all duration-500" />
													<span className="sr-only">
														{currentProject.title} - {t("card-footer.live")}
													</span>
												</TooltipTrigger>
												<TooltipContent>{t("card-footer.live")}</TooltipContent>
											</Tooltip>
										</Link>
									)}
									{!!currentProject.githubLink && (
										<Link href={currentProject.githubLink}>
											<Tooltip>
												<TooltipTrigger className="size-16 rounded-full border border-card-foreground flex justify-center items-center group hover:border-primary hover:border-2 hover:border-dashed hover:transition-all hover:duration-100">
													<RiGithubLine className="text-3xl text-card-foreground group-hover:text-primary transition-all duration-500" />
													<span className="sr-only">
														{currentProject.title} - {t("card-footer.github")}
													</span>
												</TooltipTrigger>
												<TooltipContent>
													{t("card-footer.github")}
												</TooltipContent>
											</Tooltip>
										</Link>
									)}
								</div>
								<div className="flex gap-4 items-center">
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												onClick={handlePrevious}
												disabled={!api?.canScrollPrev()}
												variant="ghost"
												className="size-16 rounded-full border border-card-foreground flex justify-center items-center group hover:bg-white hover:border-primary hover:border-2 hover:border-dashed hover:transition-all hover:duration-100"
											>
												<RiArrowLeftSLine className="text-3xl text-card-foreground group-hover:text-primary transition-all duration-500" />
												<span className="sr-only">
													{t("card-footer.previous")}
												</span>
											</Button>
										</TooltipTrigger>
										<TooltipContent>{t("card-footer.previous")}</TooltipContent>
									</Tooltip>
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												onClick={handleNext}
												disabled={!api?.canScrollNext()}
												variant="ghost"
												className="size-16 rounded-full border border-card-foreground flex justify-center items-center group hover:bg-white hover:border-primary hover:border-2 hover:border-dashed hover:transition-all hover:duration-100"
											>
												<RiArrowRightSLine className="text-3xl text-card-foreground group-hover:text-primary transition-all duration-500" />
												<span className="sr-only">{t("card-footer.next")}</span>
											</Button>
										</TooltipTrigger>
										<TooltipContent>{t("card-footer.next")}</TooltipContent>
									</Tooltip>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</article>
	);
}
