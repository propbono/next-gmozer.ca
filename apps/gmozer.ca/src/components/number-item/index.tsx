export type NumberItemProps = {
	number: number;
	title: string;
	description: string;
	isLastItem?: boolean;
};

export const NumberItem = ({
	number,
	title,
	description,
	isLastItem = false,
}: NumberItemProps) => {
	return (
		<div className="relative pl-16 md:pl-0">
			<div className="md:grid md:grid-cols-5 md:gap-8 items-start">
				<div className="absolute left-0 md:static flex md:justify-center">
					<div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
						{number}
					</div>
				</div>
				<div className="md:col-span-4 space-y-2">
					<h3 className="text-xl font-semibold">{title}</h3>
					<p className="text-muted-foreground">{description}</p>
				</div>
			</div>
			{!isLastItem && (
				<div className="absolute left-6 top-12 h-full w-0.5 bg-primary md:hidden" />
			)}
		</div>
	);
};
