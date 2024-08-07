import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { NavItem } from "@/types/nav";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { RxHamburgerMenu } from "react-icons/rx";

export const MobileNav = ({
  items,
  pathname,
}: {
  items: NavItem[];
  pathname: string;
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <RxHamburgerMenu />
          <span className="sr-only">Mobile Nav</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <nav className="flex flex-col items-center gap-6">
          {items.map((item) => {
            return (
              <SheetClose asChild key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    "text-foreground hover:text-primary py-2 font-bold text-lg capitalize",
                    pathname === item.href &&
                      "text-primary border-b-2 border-primary"
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
