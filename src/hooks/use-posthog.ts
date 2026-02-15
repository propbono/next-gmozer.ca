"use client";

import { usePostHog as usePostHogOriginal } from "posthog-js/react";
import type { PostHogEvents } from "@/lib/posthog";

export const usePostHog = () => {
	const posthog = usePostHogOriginal();

	return {
		...posthog,
		capture: <K extends keyof PostHogEvents>(
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
			posthog?.capture(eventName, args[0], args[1]);
		},
	};
};
