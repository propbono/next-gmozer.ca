import type { PostHogEvents } from "@gmozer/types";
import { PostHog } from "posthog-node";

export const phServerCapture = async <K extends keyof PostHogEvents>(
	eventName: K,
	distinctId: string,
	...args: PostHogEvents[K] extends Record<string, never>
		? [properties?: PostHogEvents[K]]
		: [properties: PostHogEvents[K]]
) => {
	const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
	if (!apiKey) {
		// biome-ignore lint/suspicious/noConsole: Warn on missing key
		console.warn("NEXT_PUBLIC_POSTHOG_KEY is not defined");
		return;
	}

	const client = new PostHog(apiKey, {
		host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
		flushAt: 1,
		flushInterval: 0,
	});

	const properties = args[0];

	client.capture({
		distinctId,
		event: eventName,
		properties: properties || {},
	});

	await client.shutdown();
};
