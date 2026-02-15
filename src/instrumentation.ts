export async function register() {
	if (process.env.NEXT_RUNTIME === "nodejs") {
		await import("@/instrumentation-node");
	} else {
		// This imports the client instrumentation
		await import("@/instrumentation-client").then((mod) => mod.register());
	}
}
