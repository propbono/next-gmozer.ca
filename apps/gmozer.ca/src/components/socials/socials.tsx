"use client";

import { SocialLinks } from "@gmozer/ui";
import { cn } from "@gmozer/utils";
import { SOCIALS } from "@/constants/socials";
import { useMediaQuery } from "@/hooks/use-media-query";
import { phClientCapture } from "@/lib/posthog/client";

export const Socials = ({
	containerStyles,
	iconStyles,
	as = "nav",
}: {
	containerStyles?: string;
	iconStyles?: string;
	as?: "nav" | "div";
}) => {
	const isMobile = useMediaQuery("(max-width: 768px)");

	const handleSocialClick = (item: { name: string; url: string }) => {
		phClientCapture("click_social_link", {
			name: item.name,
			url: item.url,
		});
	};

	if (as === "nav") {
		return (
			<nav className={cn(containerStyles)}>
				<SocialLinks
					items={SOCIALS}
					isMobile={isMobile}
					iconClassName={iconStyles}
					onItemClick={handleSocialClick}
				/>
			</nav>
		);
	}

	return (
		<div className={cn(containerStyles)}>
			<SocialLinks
				items={SOCIALS}
				isMobile={isMobile}
				iconClassName={iconStyles}
				onItemClick={handleSocialClick}
			/>
		</div>
	);
};
