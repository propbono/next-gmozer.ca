import { SERVICES } from "@/constants/services";
import { PROJECTS } from "@/constants/work";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://gmozer.ca";

  // Base routes
  const routes = ["", "/contact", "/about", "/projects"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 1,
  }));

  // Service routes
  const serviceRoutes = SERVICES.map((service) => ({
    url: `${baseUrl}${service.href}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Project routes
  const projectRoutes = PROJECTS.map((project) => ({
    url: `${baseUrl}/projects/${project.title.toLowerCase().replace(/\s+/g, "-")}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...routes, ...serviceRoutes, ...projectRoutes];
}
