"use client";
import type { Project } from "@gmozer/types";
import { isStringArray } from "@gmozer/utils";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { PROJECT_KEYS } from "@/constants/main";
import { ProjectItem } from "./project-items/project-item";

export function ProjectShowcase() {
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

	return (
		<article className="container py-12 flex flex-col">
			{projects.map((project, index) => (
				<ProjectItem
					key={project.title}
					project={project}
					index={index}
					isLast={index === projects.length - 1}
				/>
			))}
		</article>
	);
}
