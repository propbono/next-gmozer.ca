import { checkPayloadEnabled } from "@/lib/check-payload-enabled";

/**
 * Wraps the common pattern: check Payload feature flag → try Payload →
 * catch → fallback to messages. Shared across all data fetchers.
 */
export async function withPayloadFallback<T>(
	fetchFromPayload: () => Promise<T>,
	fallback: () => Promise<T>,
): Promise<T> {
	const isEnabled = await checkPayloadEnabled();
	if (!isEnabled) return fallback();

	try {
		return await fetchFromPayload();
	} catch (error) {
		// biome-ignore lint/suspicious/noConsole: Log fallback for debugging
		console.error("Payload fetch failed, falling back:", error);
		return fallback();
	}
}
