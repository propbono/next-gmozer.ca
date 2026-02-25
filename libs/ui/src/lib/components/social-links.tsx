import type { Social } from "@gmozer/types";
import { cn } from "@gmozer/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export type SocialLinksProps = {
	items: Social[];
	isMobile?: boolean;
	iconClassName?: string;
	onItemClick?: (item: Social) => void;
};

export const SocialLinks = ({
	items,
	isMobile = false,
	iconClassName,
	onItemClick,
}: SocialLinksProps) => {
	if (!items || items.length === 0) return null;

	const handleClick = (item: Social) => {
		onItemClick?.(item);
	};

	if (isMobile) {
		return (
			<>
				{items.map((item) => {
					const Icon = item.icon;
					return (
						<a
							key={item.name}
							href={item.url}
							className={cn(iconClassName)}
							target="_blank"
							rel="noreferrer"
							onClick={() => handleClick(item)}
						>
							<Icon className="size-4" />
							<span className="sr-only">{item.name}</span>
						</a>
					);
				})}
			</>
		);
	}

	return (
		<>
			{items.map((item) => {
				const Icon = item.icon;
				return (
					<Tooltip key={item.name}>
						<TooltipTrigger asChild>
							<a
								href={item.url}
								className={cn(iconClassName)}
								target="_blank"
								rel="noreferrer"
								onClick={() => handleClick(item)}
							>
								<Icon className="size-4" />
								<span className="sr-only">{item.name}</span>
							</a>
						</TooltipTrigger>
						<TooltipContent sideOffset={10} className="text-primary">
							{item.name}
						</TooltipContent>
					</Tooltip>
				);
			})}
		</>
	);
};
