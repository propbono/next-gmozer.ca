import type { routing } from "@/i18n/routing";
// biome-ignore lint/style/useImportType: <explanation>
import messages from "../../messages/en.json";

declare module "next-intl" {
	interface AppConfig {
		Locale: (typeof routing.locales)[number];
		Messages: typeof messages;
	}
}
