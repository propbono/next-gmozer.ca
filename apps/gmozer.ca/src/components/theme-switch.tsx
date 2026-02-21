"use client";

import { Button } from "@gmozer/ui";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { LuMoon, LuSun } from "react-icons/lu";

export const ThemeSwitch = () => {
	const { theme, setTheme } = useTheme();
	const t = useTranslations("header.themeSwitch");

	return (
		<Button
			variant="ghost"
			size="icon"
			onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
		>
			<LuSun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<LuMoon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<span className="sr-only">{t("toggle")}</span>
		</Button>
	);
};
