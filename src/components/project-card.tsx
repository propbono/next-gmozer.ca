"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "@/i18n/navigation";
import type { Project } from "@/types/work";
import { useTranslations } from "next-intl";
import {
	RiArrowLeftSLine,
	RiArrowRightDownLine,
	RiArrowRightSLine,
	RiGithubLine,
} from "react-icons/ri";

type ProjectCardProps = {
	project: Project;
	index: number;
	onNext: () => void;
	onPrevious: () => void;
	canNext: boolean;
	canPrevious: boolean;
};

export function ProjectCard({
	project,
	index,
	onNext,
	onPrevious,
	canNext,
	canPrevious,
}: ProjectCardProps) {
	const t = useTranslations("work");

	return (
		<Card className="w-full sm:w-[672px] h-[600px] z-10 shadow-lg shadow-white/75">
			<CardContent className="h-full flex flex-col p-6">
				<div className="flex-shrink-0">
					<span className="text-8xl leading-none font-extrabold text-primary mb-8 block">
						{(index + 1).toString().padStart(2, "0")}
					</span>
					<h1
						id="project-title"
						className="leading-tight font-bold text-4xl sm:text-5xl text-card-foreground group-hover:text-primary transition-all duration-500 capitalize mb-6 line-clamp-2"
					>
						{project.title}
					</h1>
					<h2 className="leading-none font-medium text-2x mb-4">
						{project.category}
					</h2>
				</div>

				<div className="flex-grow flex flex-col justify-between min-h-0">
					<span className="text-muted-foreground mb-4 line-clamp-2">
						{project.description}
					</span>

					<div className="flex flex-wrap gap-2 overflow-y-auto max-h-24 mb-4">
						{project.stack.map((stack) => (
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
							{!!project.liveLink && (
								<Link href={project.liveLink}>
									<Tooltip>
										<TooltipTrigger className="size-16 rounded-full border border-card-foreground flex justify-center items-center group hover:border-primary hover:border-2 hover:border-dashed hover:transition-all hover:duration-100">
											<RiArrowRightDownLine className="text-3xl text-card-foreground group-hover:text-primary group-hover:-rotate-45 transition-all duration-500" />
											<span className="sr-only">
												{project.title} - {t("card-footer.live")}
											</span>
										</TooltipTrigger>
										<TooltipContent>{t("card-footer.live")}</TooltipContent>
									</Tooltip>
								</Link>
							)}
							{!!project.githubLink && (
								<Link href={project.githubLink}>
									<Tooltip>
										<TooltipTrigger className="size-16 rounded-full border border-card-foreground flex justify-center items-center group hover:border-primary hover:border-2 hover:border-dashed hover:transition-all hover:duration-100">
											<RiGithubLine className="text-3xl text-card-foreground group-hover:text-primary transition-all duration-500" />
											<span className="sr-only">
												{project.title} - {t("card-footer.github")}
											</span>
										</TooltipTrigger>
										<TooltipContent>{t("card-footer.github")}</TooltipContent>
									</Tooltip>
								</Link>
							)}
						</div>
						<div className="flex gap-4 items-center">
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										onClick={onPrevious}
										disabled={!canPrevious}
										variant="ghost"
										className="size-16 rounded-full border border-card-foreground flex justify-center items-center group hover:bg-white hover:border-primary hover:border-2 hover:border-dashed hover:transition-all hover:duration-100"
									>
										<RiArrowLeftSLine className="text-3xl text-card-foreground group-hover:text-primary transition-all duration-500" />
										<span className="sr-only">{t("card-footer.previous")}</span>
									</Button>
								</TooltipTrigger>
								<TooltipContent>{t("card-footer.previous")}</TooltipContent>
							</Tooltip>
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										onClick={onNext}
										disabled={!canNext}
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
	);
}
