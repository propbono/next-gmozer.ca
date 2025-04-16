"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { SocialLinks } from "./social-link";

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

	if (as === "nav") {
		return (
			<nav className={cn(containerStyles)}>
				<SocialLinks isMobile={isMobile} iconStyles={iconStyles} />
			</nav>
		);
	}

	return (
		<div className={cn(containerStyles)}>
			<SocialLinks isMobile={isMobile} iconStyles={iconStyles} />
		</div>
	);
};
