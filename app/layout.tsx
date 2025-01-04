import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import "./globals.css";
import { constructMetadata } from "@/app/metadata";
import { siteConfig } from "./metadata";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-ubuntu",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": siteConfig.name,
  "jobTitle": "Senior Fullstack Engineer",
  "url": siteConfig.url,
  "sameAs": [
    siteConfig.links.github,
    siteConfig.links.linkedin,
  ],
  "skills": ["React", "TypeScript", "Next.js", "Node.js"],
  "worksFor": {
    "@type": "Organization",
    "name": "Heineken",
  },
};

export const metadata = constructMetadata({
  title: "Greg Mozer | Senior Fullstack Engineer",
  description: "Building high-performance web applications with modern technologies",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "flex flex-col min-h-screen min-w-72",
          ubuntu.variable,
        )}
      >
        <TooltipProvider delayDuration={150}>
          {children}
        </TooltipProvider>
        <Toaster />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
