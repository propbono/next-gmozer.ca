import { RiGithubFill, RiMailSendFill, RiLinkedinFill } from "react-icons/ri";

import type { Social } from "@/types/social";

export const SOCIALS: Social[] = [
	{ name: "Github", url: "https://github.com/propbono/", icon: RiGithubFill },
	{
		name: "Linkedin",
		url: "https://www.linkedin.com/in/greg-mozer/",
		icon: RiLinkedinFill,
	},
	{ name: "Email", url: "mailto:propbono@gmail", icon: RiMailSendFill },
];
