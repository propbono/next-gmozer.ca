"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/nav";

import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useState } from "react";

import { DesktopNav } from "../desktop-nav";
import { LocaleSwitcher } from "../language-switcher";
import { MobileNav } from "../mobile-nav";
import { ThemeSwitch } from "../theme-switch";

export const Header = () => {
	const header = useTranslations("header");
	const nav = useTranslations("navigation");
	const locale = useLocale();

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
				name: nav("home.default.title"),
				href: nav("home.default.url"),
			},
			{
				name: nav("services.default.title"),
				href: nav("services.default.url"),
			},
			{
				name: nav("resume.default.title"),
				href: nav("resume.default.url"),
			},
			{
				name: nav("work.default.title"),
				href: nav("work.default.url"),
			},
			{
				name: nav("contact.default.title"),
				href: nav("contact.default.url"),
			},
		];
	}, [nav]);

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
				<Link
					href="/"
					className="group text-foreground hover:text-primary text-2xl font-bold"
				>
					{header("name")}
					<span className="text-primary group-hover:text-foreground">.</span>
				</Link>
				<div className="flex flex-row-reverse sm:flex-row items-center gap-4">
					{isMediumBreakpoint ? memoizedDesktopNav : memoizedMobileNav}
					{pathname === "/" && <LocaleSwitcher />}
					<ThemeSwitch />
				</div>
			</div>
		</header>
	);
};
