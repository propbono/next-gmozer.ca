"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

import { type Locale, useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";

export const LocaleSwitcher = () => {
	const t = useTranslations("locale-switcher");
	const locale = useLocale();
	const router = useRouter();
	const [_isPending, startTransition] = useTransition();
	const pathname = usePathname();
	const params = useParams();

	function onSelectChange(value: Locale) {
		startTransition(() => {
			router.replace(
				// @ts-expect-error -- TypeScript will validate that only known `params`
				// are used in combination with a given `pathname`. Since the two will
				// always match for the current route, we can skip runtime checks.
				{ pathname, params },
				{ locale: value },
			);
		});
	}

	return (
		<Select
			onValueChange={(value: string) => onSelectChange(value as Locale)}
			defaultValue={locale}
		>
			<SelectTrigger className="w-fit">
				<SelectValue placeholder={t("label")} />
			</SelectTrigger>
			<SelectContent>
				{routing.locales.map((cur) => (
					<SelectItem key={cur} value={cur}>
						{t(`locale.${cur}`)}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};
