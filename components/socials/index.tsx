import { cn } from "@/lib/utils";
import { Social } from "@/types/social";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const Socials = ({
  containerStyles,
  iconStyles,
  links,
  as = "nav",
}: {
  containerStyles?: string;
  iconStyles?: string;
  links: Social[];
  as?: "nav" | "div";
}) => {
  if (links.length === 0) {
    return null;
  }

  if (as === "nav") {
    return (
      <nav className={cn(containerStyles)}>
        {links.map(({ name, url, icon: Icon }) => (
          <Link
            key={name}
            href={url}
            className={cn(iconStyles)}
            target="_blank"
          >
            <Icon />
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <div className={cn(containerStyles)}>
      {links.map(({ name, url, icon: Icon }) => (
        <Tooltip key={name}>
          <TooltipTrigger>
            <Link href={url} className={cn(iconStyles)} target="_blank">
              <Icon />
            </Link>
          </TooltipTrigger>
          <TooltipContent>{name}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};
