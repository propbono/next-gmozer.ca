"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";
import SuspendedPostHogPageView from "./posthog-pageview";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
	useEffect(() => {
		const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
		if (!apiKey) {
			return;
		}
		posthog.init(apiKey, {
			api_host: "/ingest",
			ui_host: "https://us.posthog.com",
			capture_pageview: false, // Handled manually
			capture_pageleave: true,
		});
	}, []);

	return (
		<PHProvider client={posthog}>
			<SuspendedPostHogPageView />
			{children}
		</PHProvider>
	);
}
