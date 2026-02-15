import { PostHog } from "posthog-node";

export type PostHogEvents = {
	$pageview: {
		$current_url: string;
	};
	download_resume: Record<string, never>;
	click_social_link: {
		name: string;
		url: string;
	};
};

export const PostHogClient = () => {
	const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
	if (!apiKey) {
		throw new Error("NEXT_PUBLIC_POSTHOG_KEY is not defined");
	}
	const posthogClient = new PostHog(apiKey, {
		host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
		flushAt: 1,
		flushInterval: 0,
	});
	return posthogClient;
};
