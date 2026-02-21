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
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
