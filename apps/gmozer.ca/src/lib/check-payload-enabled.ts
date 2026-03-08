import { getPostHogServerClient } from "@/lib/posthog/server";

export const checkPayloadEnabled = async (): Promise<boolean> => {
	const client = getPostHogServerClient();
	if (!client) return false;

	try {
		const isEnabled = await client.isFeatureEnabled(
			"isPayloadEnabled",
			"server",
		);

		return isEnabled === true;
	} catch {
		return false;
	}
};
