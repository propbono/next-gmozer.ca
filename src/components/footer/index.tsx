"use client";
import { usePathname } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { RiCopyrightLine } from "react-icons/ri";
import { LocaleSwitcher } from "../language-switcher";
import { Socials } from "../socials";

export const Footer = () => {
	const t = useTranslations("footer");
	const pathname = usePathname();

	return (
		<footer className="bg-foreground py-8">
			<div className="font-medium container flex flex-col items-center justify-between gap-4  md:flex-row">
				<span className="flex items-center align-middle text-muted gap-2">
					<RiCopyrightLine /> {t("copyright")}
				</span>
				<div className="flex items-center gap-8">
					<Socials
						containerStyles="flex items-center align-middle gap-8"
						iconStyles="text-2xl text-muted hover:text-primary hover:transition-all duration-500"
					/>
					{pathname !== "/" && <LocaleSwitcher />}
				</div>
			</div>
		</footer>
	);
};
