"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { SuspendedPostHogPageView } from "../posthog-pageview";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
	return (
		<PHProvider client={posthog}>
			<SuspendedPostHogPageView />
			{children}
		</PHProvider>
	);
}
