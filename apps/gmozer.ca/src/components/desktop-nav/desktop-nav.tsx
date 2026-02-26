import type { NavItem } from "@gmozer/types";
import { Button } from "@gmozer/ui";
import { cn } from "@gmozer/utils";
import { Link } from "@/i18n/navigation";

export const DesktopNav = ({
	items,
	pathname,
}: {
	items: NavItem[];
	pathname: string;
}) => {
	return (
		<nav className="flex items-center gap-6">
			{items.map((item, index) => {
				const isActive =
					pathname === item.href ||
					(item.href !== "/" && pathname.includes(item.href));

				if (index === items.length - 1) {
					return (
						<Button
							key={item.name}
							asChild
							variant={isActive ? "default" : "outline"}
						>
							<Link href={item.href}>{item.name}</Link>
						</Button>
					);
				}

				return (
					<Link
						key={item.name}
						href={item.href}
						className={cn(
							"text-foreground hover:text-primary py-2 font-bold text-lg capitalize",
							isActive && "text-primary border-b-2 border-primary",
						)}
					>
						{item.name}
					</Link>
				);
			})}
		</nav>
	);
};
