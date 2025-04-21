"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/nav";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { PAGE_URLS } from "@/constants/urls";
import { DesktopNav } from "../desktop-nav";
import { MobileNav } from "../mobile-nav";
import { ThemeSwitch } from "../theme-switch";

export const Header = () => {
	const t = useTranslations("header");

	const pathname = usePathname();
	const isMediumBreakpoint = useMediaQuery("(min-width:768px)");

	const [isTransparent, setIsTransparent] = useState(true);

	useEffect(() => {
		const handleScroll = () => {
			setIsTransparent(window.scrollY === 0);
		};

		document.addEventListener("scroll", handleScroll);

		return () => document.removeEventListener("scroll", handleScroll);
	}, []);

	const navItems: NavItem[] = useMemo(() => {
		return [
			{
				name: t("nav.home"),
				href: PAGE_URLS.home,
			},
			{
				name: t("nav.services"),
				href: PAGE_URLS.services,
			},
			{
				name: t("nav.resume"),
				href: PAGE_URLS.resume,
			},
			{
				name: t("nav.work"),
				href: PAGE_URLS.work,
			},
			{
				name: t("nav.contact"),
				href: PAGE_URLS.contact,
			},
		];
	}, [t]);

	const memoizedDesktopNav = useMemo(
		() => <DesktopNav items={navItems} pathname={pathname} />,
		[pathname, navItems],
	);

	const memoizedMobileNav = useMemo(
		() => <MobileNav items={navItems} pathname={pathname} />,
		[pathname, navItems],
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
						{t("name")}
						<span className="text-primary group-hover:text-foreground">.</span>
					</span>
				</Link>
				<div className="flex flex-row-reverse sm:flex-row items-center gap-4">
					{isMediumBreakpoint ? memoizedDesktopNav : memoizedMobileNav}
					<ThemeSwitch />
				</div>
			</div>
		</header>
	);
};
