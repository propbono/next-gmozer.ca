"use client";

import { Badge } from "@gmozer/ui";

type ProjectStackProps = {
	stack: string[];
};

export function ProjectStack({ stack }: ProjectStackProps) {
	return (
		<div className="flex flex-wrap gap-2">
			{stack.map((tech) => (
				<Badge key={tech} variant="secondary" className="px-3 py-1">
					{tech}
				</Badge>
			))}
		</div>
	);
}
