import { Metadata } from "next";

export const siteConfig = {
  name: "Greg Mozer",
  url: "https://gmozer.ca",
  ogImage: "https://gmozer.ca/og.jpg",
  description: "Senior Fullstack Engineer specializing in React, Next.js, and TypeScript with over 5 years of experience building scalable web applications.",
  links: {
    github: "https://github.com/propbono/",
    linkedin: "https://www.linkedin.com/in/greg-mozer/",
  },
};

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
}: {
  title?: string;
  description?: string;
  image?: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
      type: "website",
      siteName: siteConfig.name,
      url: siteConfig.url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    metadataBase: new URL(siteConfig.url),
  };
}
