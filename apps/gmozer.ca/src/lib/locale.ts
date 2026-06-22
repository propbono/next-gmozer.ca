export const SUPPORTED_LOCALES = ["en", "pl"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

/**
 * Validates that a locale string is one of the supported locales.
 * Falls back to "en" if the locale is unsupported or undefined.
 */
export function resolveLocale(locale: string | undefined): SupportedLocale {
	if (locale && SUPPORTED_LOCALES.includes(locale as SupportedLocale)) {
		return locale as SupportedLocale;
	}
	return "en";
}
