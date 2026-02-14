"use client";

import posthog from "posthog-js";
import { RxDownload } from "react-icons/rx";
import { RESUME_LINK } from "@/constants/main";
import { Link } from "@/i18n/navigation";

import { Button } from "./ui/button";

export const DownloadResume = ({ text }: { text: string }) => {
	return (
		<Button
			asChild
			variant="outline"
			className="flex gap-2 items-center uppercase"
			onClick={() => posthog.capture("download_resume")}
		>
			<Link href={RESUME_LINK} download={true} target="_blank">
				<span>{text}</span>
				<RxDownload className="text-xl" />
			</Link>
		</Button>
	);
};
