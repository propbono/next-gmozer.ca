"use client";

import { usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { type ReactNode, Suspense, useEffect } from "react";

export function PostHogProvider({ children }: { children: ReactNode }) {
	const locale = useLocale();

	useEffect(() => {
		if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
			throw new Error("NEXT_PUBLIC_POSTHOG_KEY is not defined");
		}

		posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
			api_host: `/${locale}/ingest`,
			ui_host: "https://us.posthog.com",
			capture_pageview: false, // We capture pageviews manually
			capture_pageleave: true, // Enable pageleave capture
		});
	}, [locale]);

	return (
		<PHProvider client={posthog}>
			<SuspendedPostHogPageView />
			{children}
		</PHProvider>
	);
}

function PostHogPageView() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const posthog = usePostHog();

	useEffect(() => {
		if (pathname && posthog) {
			let url = window.origin + pathname;
			const search = searchParams.toString();
			if (search) {
				url += `?${search}`;
			}
			posthog.capture("$pageview", { $current_url: url });
		}
	}, [pathname, searchParams, posthog]);

	return null;
}

function SuspendedPostHogPageView() {
	return (
		<Suspense fallback={null}>
			<PostHogPageView />
		</Suspense>
	);
}
