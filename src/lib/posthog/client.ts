import posthog from "posthog-js";
import type { PostHogEvents } from "./types";

export const phClientCapture = <K extends keyof PostHogEvents>(
	eventName: K,
	...args: PostHogEvents[K] extends Record<string, never>
		? [
				properties?: PostHogEvents[K],
				options?: Parameters<typeof posthog.capture>[2],
			]
		: [
				properties: PostHogEvents[K],
				options?: Parameters<typeof posthog.capture>[2],
			]
) => {
	if (typeof window !== "undefined") {
		posthog.capture(eventName, args[0], args[1]);
	}
};
