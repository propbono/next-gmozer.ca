"use client";
import Link from "next/link";
import { useLocale } from "next-intl";
import { RxDownload } from "react-icons/rx";
import { RESUME_LINKS } from "@/constants/main";
import { phClientCapture } from "@/lib/posthog/client";
import { Button } from "./ui/button";

export const DownloadResume = ({ text }: { text: string }) => {
	const locale = useLocale();
	const resumeLink =
		RESUME_LINKS[locale as keyof typeof RESUME_LINKS] || RESUME_LINKS.en;

	const handleDownload = () => {
		phClientCapture("download_resume", {
			locale,
			link: resumeLink,
		});
	};

	return (
		<Button
			asChild
			variant="outline"
			className="flex gap-2 items-center uppercase"
			onClick={handleDownload}
		>
			<Link href={resumeLink} download target="_blank">
				<span>{text}</span>
				<RxDownload className="text-xl" />
			</Link>
		</Button>
	);
};
