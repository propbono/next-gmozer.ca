import posthog from "posthog-js";

if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
	throw new Error("NEXT_PUBLIC_POSTHOG_KEY is not defined");
}

posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
	api_host: "/ph",
	ui_host: "https://us.posthog.com",
});
