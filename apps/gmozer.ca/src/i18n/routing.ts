import { defineRouting } from "next-intl/routing";

export const LOCALES = ["en", "pl"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE = "en";

export const isValidLocale = (locale: string): locale is Locale => {
	return (LOCALES as readonly string[]).includes(locale);
};

export const routing = defineRouting({
	locales: LOCALES,
	defaultLocale: DEFAULT_LOCALE,
});
