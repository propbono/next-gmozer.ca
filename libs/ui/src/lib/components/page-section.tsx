import { cn } from "@gmozer/utils";
import type { ReactNode } from "react";

export type PageSectionProps = {
	id?: string;
	title: string;
	description?: string;
	children: ReactNode;
	className?: string;
};

export const PageSection = ({
	id,
	title,
	description,
	children,
	className,
}: PageSectionProps) => {
	return (
		<section aria-labelledby={id || title} className={cn(className)}>
			<h2 id={id || title} className="text-2xl font-semibold mb-4">
				{title}
			</h2>
			{description && (
				<p className="text-muted-foreground mb-4">{description}</p>
			)}
			{children}
		</section>
	);
};
