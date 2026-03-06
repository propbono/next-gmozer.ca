import { withPayload } from "@payloadcms/next/withPayload";
import createNextIntlPlugin from "next-intl/plugin";

// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: "/ph/static/:path*",
				destination: "https://us-assets.i.posthog.com/static/:path*",
			},
			{
				source: "/ph/:path*",
				destination: "https://us.i.posthog.com/:path*",
			},
		];
	},
	skipTrailingSlashRedirect: true,
	transpilePackages: ["@gmozer/ui", "@gmozer/utils", "@gmozer/types"],
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		qualities: [70, 75, 100],
	},
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{
						key: "Permissions-Policy",
						value: "camera=(), microphone=(), geolocation=()",
					},
				],
			},
		];
	},
};

const withNextIntl = createNextIntlPlugin();
export default withPayload(withNextIntl(nextConfig));
