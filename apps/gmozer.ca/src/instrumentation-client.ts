import * as Sentry from "@sentry/nextjs";
import posthog from "posthog-js";

if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
	console.error("NEXT_PUBLIC_POSTHOG_KEY is not defined — PostHog analytics disabled");
} else {
	posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
		api_host: "/ph",
		ui_host: "https://us.posthog.com",
		capture_pageview: false, // Handled manually
		capture_pageleave: true,
	});
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
