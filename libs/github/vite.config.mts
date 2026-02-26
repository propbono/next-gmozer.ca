/// <reference types='vitest' />

import { fileURLToPath } from "node:url";
import { nxCopyAssetsPlugin } from "@nx/vite/plugins/nx-copy-assets.plugin";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import * as path from "path";
import { defineConfig } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(() => ({
	root: __dirname,
	cacheDir: "../../node_modules/.vite/libs/github",
	plugins: [
		nxViteTsPaths(),
		nxCopyAssetsPlugin(["*.md"]),
	],
	// Uncomment this if you are using workers.
	// worker: {
	//   plugins: () => [ nxViteTsPaths() ],
	// },
	// Configuration for building your library.
	// See: https://vite.dev/guide/build.html#library-mode
	test: {
		name: "github",
		watch: false,
		globals: true,
		environment: "node",
		include: ["{src,tests}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
		reporters: ["default"],
		coverage: {
			reportsDirectory: "../../coverage/libs/github",
			provider: "v8" as const,
		},
	},
}));
