import type { routing } from "@/i18n/routing";
import type messages from "../../messages/en.json";

declare module "next-intl" {
	// biome-ignore lint/style/useConsistentTypeDefinitions: required for module augmentation
	interface AppConfig {
		Messages: typeof messages;
		Locale: (typeof routing.locales)[number];
	}
}
