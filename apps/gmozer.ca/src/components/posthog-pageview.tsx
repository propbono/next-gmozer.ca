"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { phClientCapture } from "@/lib/posthog/client";

function PostHogPageViewContent() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (pathname) {
			let url = window.origin + pathname;
			if (searchParams.toString()) {
				url = `${url}?${searchParams.toString()}`;
			}
			phClientCapture("$pageview", {
				$current_url: url,
			});
		}
	}, [pathname, searchParams]);

	return null;
}

export default function PostHogPageView() {
	return (
		<Suspense fallback={null}>
			<PostHogPageViewContent />
		</Suspense>
	);
}
