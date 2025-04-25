import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://gmozer.ca";

	// Base routes
	const routes = [
		{
			url: `${baseUrl}/`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 1,
		},
		{
			url: `${baseUrl}/services`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.9,
		},
		{
			url: `${baseUrl}/resume`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/work`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/contact`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.7,
		},
	];

	// Service routes
	const serviceRoutes = [
		"/services/web-development",
		"/services/mobile-development",
		"/services/ui-ux-design",
		"/services/seo-optimization",
		"/services/logo-design",
	].map((service) => ({
		url: `${baseUrl}${service}`,
		lastModified: new Date(),
		changeFrequency: "monthly" as const,
		priority: 0.8,
	}));

	// Resume routes
	const resumeRoutes = [
		"/resume/education",
		"/resume/experience",
		"/resume/skills",
		"/resume/about",
	].map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date(),
		changeFrequency: "monthly" as const,
		priority: 0.7,
	}));

	return [...routes, ...serviceRoutes, ...resumeRoutes];
}
