"use client";

type ProjectHeaderProps = {
	index: number;
	title: string;
	category: string;
};

export function ProjectHeader({ index, title, category }: ProjectHeaderProps) {
	return (
		<div className="space-y-2">
			<span className="text-6xl font-black text-muted-foreground/10 leading-none block -ml-1 select-none">
				{(index + 1).toString().padStart(2, "0")}
			</span>
			<h2 className="text-4xl font-bold tracking-tight">{title}</h2>
			<p className="text-xl font-medium text-primary">{category}</p>
		</div>
	);
}
