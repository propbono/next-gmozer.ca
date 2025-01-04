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
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Greg Mozer - Senior Fullstack Engineer",
    description: "Senior Fullstack Engineer specializing in React, Next.js, and TypeScript with over 5 years of experience building scalable web applications.",
    siteName: "Greg Mozer",
    images: [
      {
        url: "https://gmozer.ca/og.jpg",
        width: 1200,
        height: 630,
        alt: "Greg Mozer - Senior Fullstack Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Greg Mozer - Senior Fullstack Engineer",
    description: "Senior Fullstack Engineer specializing in React, Next.js, and TypeScript with over 5 years of experience building scalable web applications.",
    images: ["https://gmozer.ca/og.jpg"],
    creator: "@GregMozer",
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
