// @ts-expect-error - Force testing env to prevent Next.js React 19 production build crash
process.env.NODE_ENV = "test";

import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: ["./vitest.setup.ts"],
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
			"@gmozer/utils": resolve(__dirname, "../../libs/utils/src/index.ts"),
			"@gmozer/types": resolve(__dirname, "../../libs/types/src/index.ts"),
			"@gmozer/ui": resolve(__dirname, "../../libs/ui/src/index.ts"),
		},
	},
});
