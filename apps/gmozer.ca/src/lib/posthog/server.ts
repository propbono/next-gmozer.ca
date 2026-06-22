import type { PostHogEvents } from "@gmozer/types";
import { PostHog } from "posthog-node";

// Global cache for the PostHog server client to ensure we don't instantiate
// it on every single server request during the Next.js process lifetime.
let posthogClient: PostHog | null = null;

export const getPostHogServerClient = () => {
	if (posthogClient) return posthogClient;

	const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
	if (!apiKey) {
		// biome-ignore lint/suspicious/noConsole: Warn on missing key
		console.warn("NEXT_PUBLIC_POSTHOG_KEY is not defined");
		return null;
	}

	posthogClient = new PostHog(apiKey, {
		host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
	});

	return posthogClient;
};

export const phServerCapture = async <K extends keyof PostHogEvents>(
	eventName: K,
	distinctId: string,
	...args: PostHogEvents[K] extends Record<string, never>
		? [properties?: PostHogEvents[K]]
		: [properties: PostHogEvents[K]]
) => {
	const client = getPostHogServerClient();
	if (!client) return;

	const properties = args[0];

	client.capture({
		distinctId,
		event: eventName,
		properties: properties || {},
	});

	// Flush immediately so events are sent before the response completes.
	// In serverless environments (Vercel, etc.), the process may be
	// terminated shortly after the response, so we can't rely on the
	// default batching interval.
	await client.flush();
};
