"use client";

import { Button, Tooltip, TooltipContent, TooltipTrigger } from "@gmozer/ui";
import { useTranslations } from "next-intl";
import { RiArrowRightUpLine, RiGithubLine, RiGlobalLine } from "react-icons/ri";
import { Link } from "@/i18n/navigation";

type ProjectLinksProps = {
	liveLink?: string;
	githubLink?: string;
};

export function ProjectLinks({ liveLink, githubLink }: ProjectLinksProps) {
	const t = useTranslations("work");

	return (
		<div className="flex gap-4">
			{liveLink && (
				<Tooltip>
					<TooltipTrigger asChild>
						<Button asChild size="lg" className="gap-2">
							<Link href={liveLink} target="_blank">
								<RiGlobalLine className="size-5" />
								<span>{t("visitSite")}</span>
								<RiArrowRightUpLine className="size-4 opacity-50" />
							</Link>
						</Button>
					</TooltipTrigger>
					<TooltipContent>{t("viewLiveProject")}</TooltipContent>
				</Tooltip>
			)}

			{githubLink && (
				<Tooltip>
					<TooltipTrigger asChild>
						<Button asChild variant="outline" size="lg" className="gap-2">
							<Link href={githubLink} target="_blank">
								<RiGithubLine className="size-5" />
								<span>{t("sourceCode")}</span>
							</Link>
						</Button>
					</TooltipTrigger>
					<TooltipContent>{t("viewOnGitHub")}</TooltipContent>
				</Tooltip>
			)}
		</div>
	);
}
