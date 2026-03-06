"use client";
import type { Project } from "@gmozer/types";
import { ProjectItem } from "./project-items/project-item";

type ProjectShowcaseProps = {
	projects: Project[];
};

export function ProjectShowcase({ projects }: ProjectShowcaseProps) {
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
