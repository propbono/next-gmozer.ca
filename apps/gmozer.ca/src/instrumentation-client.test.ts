import { afterEach, describe, expect, it, vi } from "vitest";

// Must mock before import since instrumentation-client has top-level side effects
const mockInit = vi.fn();

vi.mock("posthog-js", () => ({
	default: { init: mockInit },
}));

describe("PostHog instrumentation-client", () => {
	const originalKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;

	afterEach(() => {
		vi.resetModules();
		// Restore original env variable
		process.env.NEXT_PUBLIC_POSTHOG_KEY = originalKey;
		mockInit.mockClear();
	});

	it("does NOT throw when NEXT_PUBLIC_POSTHOG_KEY is missing", async () => {
		delete process.env.NEXT_PUBLIC_POSTHOG_KEY;
		// Should not throw
		await expect(import("@/instrumentation-client")).resolves.toBeDefined();
	});

	it("does NOT call posthog.init when key is missing", async () => {
		delete process.env.NEXT_PUBLIC_POSTHOG_KEY;
		await import("@/instrumentation-client");
		expect(mockInit).not.toHaveBeenCalled();
	});

	it("calls posthog.init when key is present", async () => {
		process.env.NEXT_PUBLIC_POSTHOG_KEY = "test-key";
		await import("@/instrumentation-client");
		expect(mockInit).toHaveBeenCalledWith(
			"test-key",
			expect.objectContaining({
				api_host: "/ph",
				capture_pageview: false,
				capture_pageleave: true,
			}),
		);
	});
});
