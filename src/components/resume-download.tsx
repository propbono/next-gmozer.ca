"use client";

import { RxDownload } from "react-icons/rx";
import { RESUME_LINK } from "@/constants/main";
import { usePostHog } from "@/hooks/use-posthog";
import { Link } from "@/i18n/navigation";

import { Button } from "./ui/button";

export const DownloadResume = ({ text }: { text: string }) => {
	const posthog = usePostHog();

	const handleDownload = () => {
		posthog?.capture("download_resume");
	};

	return (
		<Button
			asChild
			variant="outline"
			className="flex gap-2 items-center uppercase"
			onClick={handleDownload}
		>
			<Link href={RESUME_LINK} download={true} target="_blank">
				<span>{text}</span>
				<RxDownload className="text-xl" />
			</Link>
		</Button>
	);
};
