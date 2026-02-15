import createNextIntlPlugin from "next-intl/plugin";

// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
	skipTrailingSlashRedirect: true,
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
