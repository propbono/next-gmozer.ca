import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { SOCIALS } from "@/constants/socials";
import { usePostHog } from "@/hooks/use-posthog";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export const SocialLinks = ({
	isMobile = false,
	iconStyles,
}: {
	isMobile?: boolean;
	iconStyles?: string;
}) => {
	const posthog = usePostHog();

	if (!SOCIALS || SOCIALS.length === 0) {
		return null;
	}

	const handleSocialClick = (name: string, url: string) => {
		posthog?.capture("click_social_link", {
			name,
			url,
		});
	};

	if (isMobile) {
		return (
			<>
				{SOCIALS.map(({ name, url, icon: Icon }) => (
					<Link
						key={name}
						href={url}
						className={cn(iconStyles)}
						target="_blank"
						onClick={() => handleSocialClick(name, url)}
					>
						<Icon className="size-4" />
						<span className="sr-only">{name}</span>
					</Link>
				))}
			</>
		);
	}

	return (
		<>
			{SOCIALS.map(({ name, url, icon: Icon }) => (
				<Tooltip key={name}>
					<TooltipTrigger>
						<Link
							href={url}
							className={cn(iconStyles)}
							target="_blank"
							onClick={() => handleSocialClick(name, url)}
						>
							<Icon className="size-4" />
							<span className="sr-only">{name}</span>
						</Link>
					</TooltipTrigger>
					<TooltipContent sideOffset={10} className="text-primary">
						{name}
					</TooltipContent>
				</Tooltip>
			))}
		</>
	);
};
