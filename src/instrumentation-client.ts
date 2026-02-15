"use client";

import posthog from "posthog-js";

export function register() {
	if (typeof window !== "undefined") {
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
	}
}
