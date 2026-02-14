import { useTranslations } from "next-intl";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types/nav";
import { Button } from "../ui/button";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetTitle,
	SheetTrigger,
} from "../ui/sheet";

export const MobileNav = ({
	items,
	pathname,
}: {
	items: NavItem[];
	pathname: string;
}) => {
	const t = useTranslations("header.mobileMenu");

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="outline" size="icon">
					<RxHamburgerMenu />
					<span className="sr-only">{t("open")}</span>
				</Button>
			</SheetTrigger>

			<SheetContent side="right">
				<SheetTitle className="sr-only">{t("title")}</SheetTitle>
				<SheetDescription className="sr-only">
					{t("description")}
				</SheetDescription>
				<nav className="flex flex-col items-center gap-6">
					{items.map((item) => {
						const isActive =
							pathname === item.href ||
							(item.href !== "/" && pathname.includes(item.href));

						return (
							<SheetClose asChild key={item.name}>
								<Link
									href={item.href}
									className={cn(
										"text-foreground hover:text-primary py-2 font-bold text-lg capitalize",
										isActive && "text-primary border-b-2 border-primary",
									)}
								>
									{item.name}
								</Link>
							</SheetClose>
						);
					})}
				</nav>
			</SheetContent>
		</Sheet>
	);
};
