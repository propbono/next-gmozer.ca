import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { NavItem } from "@/types/nav";

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
        if (index === items.length - 1) {
          return (
            <Button
              key={item.name}
              asChild
              variant={pathname === item.href ? "default" : "outline"}
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
              pathname === item.href && "text-primary border-b-2 border-primary"
            )}
          >
            {item.name}
          </Link>
        );
      })}
    </nav>
  );
};
