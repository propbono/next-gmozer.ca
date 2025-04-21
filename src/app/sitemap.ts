import { PAGE_URLS, SERVICE_URLS } from "@/constants/urls";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
	const baseUrl = "https://gmozer.ca";

	// Base routes
	const routes = Object.values(PAGE_URLS).map((route) => ({
		url: `${baseUrl}${route}`,
		lastModified: new Date(),
		changeFrequency: "monthly" as const,
		priority: 1,
	}));

	// Service routes
	const serviceRoutes = Object.values(SERVICE_URLS).map((service) => ({
		url: `${baseUrl}${PAGE_URLS.services}${service}`,
		lastModified: new Date(),
		changeFrequency: "monthly" as const,
		priority: 0.8,
	}));

	return [...routes, ...serviceRoutes];
}
