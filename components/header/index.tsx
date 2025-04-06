"use client";
import { navItems } from "@/constants/nav";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { DesktopNav } from "../desktop-nav";
import { MobileNav } from "../mobile-nav";

export const Header = () => {
	const pathname = usePathname();
	const isMediumBreakpoint = useMediaQuery("(min-width:768px)"); // lg: breakpoint in tailwind

	const [isTransparent, setIsTransparent] = useState(true);

	useEffect(() => {
		const handleScroll = () => {
			setIsTransparent(window.scrollY === 0);
		};

		document.addEventListener("scroll", handleScroll);

		return () => document.removeEventListener("scroll", handleScroll);
	}, []);

	const memoizedDesktopNav = useMemo(
		() => <DesktopNav items={navItems} pathname={pathname} />,
		[pathname],
	);

	const memoizedMobileNav = useMemo(
		() => <MobileNav items={navItems} pathname={pathname} />,
		[pathname],
	);

	return (
		<header
			className={cn(
				"z-50 w-full py-8 transition delay-100 duration-500 md:fixed",
				isTransparent && isMediumBreakpoint && "bg-opacity-0",
				((!isTransparent && isMediumBreakpoint) || !isMediumBreakpoint) &&
					"bg-opacity-100 bg-background shadow-md shadow-muted",
			)}
		>
			<div className="container mx-auto flex items-center justify-between">
				<Link href="/">
					<span className="group text-foreground hover:text-primary text-2xl font-bold">
						Greg Mozer
						<span className="text-primary group-hover:text-foreground">.</span>
					</span>
				</Link>
				{isMediumBreakpoint ? memoizedDesktopNav : memoizedMobileNav}
			</div>
		</header>
	);
};
