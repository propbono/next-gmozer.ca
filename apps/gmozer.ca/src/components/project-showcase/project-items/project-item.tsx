"use client";

import type { Project } from "@gmozer/types";
import { Separator } from "@gmozer/ui";
import { motion } from "framer-motion";
import { ProjectHeader } from "./project-header";
import { ProjectImage } from "./project-image";
import { ProjectLinks } from "./project-links";
import { ProjectStack } from "./project-stack";

type ProjectItemProps = {
	project: Project;
	index: number;
	isLast: boolean;
};

export function ProjectItem({ project, index, isLast }: ProjectItemProps) {
	return (
		<>
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, margin: "-100px" }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="group grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12"
			>
				<ProjectImage
					src={project.image}
					alt={project.title}
					className={index % 2 === 1 ? "lg:order-2" : ""}
					imageSizes={project.imageSizes}
				/>

				<div
					className={`flex flex-col gap-6 ${
						index % 2 === 1 ? "lg:order-1" : ""
					}`}
				>
					<ProjectHeader
						index={index}
						title={project.title}
						category={project.category}
					/>

					<p className="text-lg text-muted-foreground leading-relaxed">
						{project.description}
					</p>

					<ProjectStack stack={project.stack} />

					<Separator className="my-2" />

					<ProjectLinks
						liveLink={project.liveLink}
						githubLink={project.githubLink}
					/>
				</div>
			</motion.div>
			{!isLast && <Separator className="my-12" />}
		</>
	);
}
