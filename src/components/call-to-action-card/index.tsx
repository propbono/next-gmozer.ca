import { Link } from "@/i18n/navigation";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

export type CallToActionCardProps = {
	ctaTitle: string;
	ctaDescription: string;
	ctaUrl: string;
	ctaUrlText: string;
};

export const CallToActionCard = ({
	ctaTitle,
	ctaDescription,
	ctaUrl,
	ctaUrlText,
}: CallToActionCardProps) => {
	return (
		<Card className="bg-gradient-to-r from-primary-foreground to-slate-200 border-0">
			<CardContent className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
				<div className="space-y-4 text-center md:text-left">
					<h2 className="text-2xl md:text-3xl font-bold tracking-tight">
						{ctaTitle}
					</h2>
					<p className="text-muted-foreground">{ctaDescription}</p>
				</div>
				<Button
					size="lg"
					className="bg-primary hover:bg-primary-foreground text-primary-foreground hover:text-primary"
					asChild
				>
					<Link href={ctaUrl}>{ctaUrlText}</Link>
				</Button>
			</CardContent>
		</Card>
	);
};
