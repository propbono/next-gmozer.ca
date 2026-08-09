import * as Sentry from "@sentry/nextjs";

Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
	// Replay is disabled by default in newer versions; enable if needed
	// integrations: [Sentry.replayIntegration()],

	// Performance monitoring sample rate
	tracesSampleRate: 1.0,

	// Adjust in production to reduce data volume
	// tracesSampleRate: 0.1,
});
