import createNextIntlPlugin from "next-intl/plugin";

// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	async rewrites() {
		return [
			{
				source: "/:locale/ingest/static/:path*",
				destination: "https://us-assets.i.posthog.com/static/:path*",
			},
			{
				source: "/:locale/ingest/:path*",
				destination: "https://us.i.posthog.com/:path*",
			},
			{
				source: "/:locale/ingest/decide",
				destination: "https://us.i.posthog.com/decide",
			},
		];
	},
	skipTrailingSlashRedirect: true,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
