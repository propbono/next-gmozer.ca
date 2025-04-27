import type { ReactElement } from "react";
import { LuChevronRight } from "react-icons/lu";

import { Card, CardContent } from "../ui/card";

export type ServiceCardProps = {
	title: string;
	description: string;
	icon?: ReactElement;
	hasSecondChevronIcon?: boolean;
};

export const ServiceCard = ({
	title,
	description,
	icon,
	hasSecondChevronIcon = true,
}: ServiceCardProps) => {
	return (
		<Card className="h-full hover:shadow-md transition-all border-muted">
			<CardContent className="p-6 space-y-4">
				<h3 className="text-xl font-semibold flex items-center gap-2">
					{icon}
					{title}
				</h3>
				<span className="flex items-center gap-2">
					{hasSecondChevronIcon && (
						<LuChevronRight className="h-4 w-4 text-primary" />
					)}
					<span>{description}</span>
				</span>
			</CardContent>
		</Card>
	);
};
