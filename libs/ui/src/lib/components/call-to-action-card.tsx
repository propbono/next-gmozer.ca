import type { ReactNode } from "react";
import { Card, CardContent } from "../ui/card";

export type CallToActionCardProps = {
	title: string;
	description: string;
	action: ReactNode;
};

export const CallToActionCard = ({
	title,
	description,
	action,
}: CallToActionCardProps) => {
	return (
		<Card className="bg-gradient-to-r from-primary-foreground dark:from-primary dark:to-primary-foreground to-slate-200 border-0">
			<CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
				<div className="space-y-4 text-center md:text-left">
					<h2 className="text-2xl md:text-3xl font-bold tracking-tight">
						{title}
					</h2>
					<p className="text-muted-foreground dark:text-foreground">
						{description}
					</p>
				</div>
				{action}
			</CardContent>
		</Card>
	);
};
