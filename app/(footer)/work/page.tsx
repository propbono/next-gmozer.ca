"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { RiArrowLeftSLine, RiArrowRightDownLine, RiArrowRightSLine, RiGithubLine } from "react-icons/ri";

const PROJECTS = [
  {
    title: "Farah Freight Group",
    category: "Frontend",
    description: "Company website for Farah Freight Group. Single Page Application created using NextJS and Nodemailer for sending emails.",
    liveLink: "https://farahfg.com/",
    githubLink: "https://github.com/propbono/farahfg.com",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Nodemailer", "Vercel"],
  },
  {
    title: "Gemprint",
    category: "Fullstack",
    description:
      "Company website for Gemprint. Single Page Application created using NextJS and NextAuth. Currently working on adding Dashboard to manage print orders.",
    liveLink: "https://gemprint.ca/",
    githubLink: "https://github.com/propbono/gemprint.ca",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Vercel"],
  },
  {
    title: "Wizzcode Music App",
    category: "Frontend",
    description:
      "Sample music app to test React Query hooks and write some cool tests in Vitest. It communicates with Itunes API and pull some albums using React Query.",
    liveLink: "https://wizcode-music.vercel.app/",
    githubLink: "https://github.com/propbono/gmozer.ca",
    stack: ["Remix.js", "TypeScript", "Tailwind CSS", "Vite", "Vercel"],
  },
  {
    title: "Propbono Portfolio - new",
    category: "Fullstack",
    description: "Propbono portfolio website presenting some of the projects that I worked on.",
    liveLink: "https://gmozer.ca/",
    githubLink: "https://github.com/propbono/next-gmozer.ca",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "FramerMotion", "Vercel"],
  },
  {
    title: "Propbono Portfolio - old",
    category: "Frontend",
    description: "Propbono portfolio website presenting some of the projects that I worked on. Written in RemixJS.",
    liveLink: "https://gmozer-old.vercel.app/",
    githubLink: "https://github.com/propbono/gmozer.ca",
    stack: ["Remix.js", "TypeScript", "Tailwind CSS", "Vite", "Vercel"],
  },
];

// TODO: Add static navigation in right bottom corner of the picture
// TODO: Add project pictures
// TODO: Add custom logo fonts for headers
// TODO: Add Contact page
// TODO: Add Hire page
// TODO: Add each service page!
// TODO: Add Theme switch
// TODO: Update colors based on the old website
// TODO: IMplement clean architecture

export default function Work() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleNext = useCallback(() => {
    if (api && api.canScrollNext()) {
      api.scrollNext();
    }
  }, [api]);

  const handlePrevious = useCallback(() => {
    if (api && api.canScrollPrev()) {
      api.scrollPrev();
    }
  }, [api]);

  return (
    <section className="container  min-h-[80vh] justify-center py-12">
      <Carousel setApi={setApi}>
        <CarouselContent>
          {PROJECTS.map((item, index) => (
            <CarouselItem key={item.title + index}>
              <div className="flex flex-col md:flex-row gap-8 items-center md:justify-between">
                <div className="w-full md:w-1/2 flex flex-col md:justify-between order-2 md:order-none">
                  <div className="flex gap-6 flex-col h-1/2">
                    <div className="flex flex-col">
                      <span className="text-8xl leading-none font-extrabold text-transparent text-outline mb-8">{(index + 1).toString().padStart(2, "0")}</span>
                      <h2 className="leading-none font-bold text-5xl text-foreground group-hover:text-primary transition-all duration-500 capitalize mb-6">
                        {item.title}
                      </h2>
                      <h3 className="leading-none font-medium text-2x mb-4">{item.category} Project</h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {item.stack.map((stack, index) => <Badge className="bg-secondary text-secondary-foreground" key={`${stack}-${index}`}>{stack}</Badge>)}
                    </div>
                    <Separator />
                    <div className="flex flex-row md:justify-between gap-4">
                      <div className="flex gap-4 items-center">
                        <Link href={item.liveLink}>
                          <Tooltip>
                            <TooltipTrigger className="size-16 rounded-full border border-foreground flex justify-center items-center group">
                              <RiArrowRightDownLine className="text-3xl text-foreground group-hover:text-primary group-hover:-rotate-45 transition-all duration-500" />
                            </TooltipTrigger>
                            <TooltipContent>Live Project</TooltipContent>
                          </Tooltip>
                        </Link>
                        <Link href={item.githubLink}>
                          <Tooltip>
                            <TooltipTrigger className="size-16 rounded-full border border-foreground flex justify-center items-center group">
                              <RiGithubLine className="text-3xl text-foreground group-hover:text-primary transition-all duration-500" />
                            </TooltipTrigger>
                            <TooltipContent>Github Repository</TooltipContent>
                          </Tooltip>
                        </Link>
                      </div>
                      <div className="flex gap-4 items-center">
                        <Button
                          onClick={handlePrevious}
                          disabled={!api?.canScrollPrev()}
                          variant="ghost"
                          className="size-16 rounded-full border border-foreground flex justify-center items-center group"
                        >
                          <RiArrowLeftSLine className="text-3xl text-foreground group-hover:text-primary transition-all duration-500" />
                        </Button>
                        <Button
                          onClick={handleNext}
                          disabled={!api?.canScrollNext()}
                          variant="ghost"
                          className="size-16 rounded-full border border-foreground flex justify-center items-center group"
                        >
                          <RiArrowRightSLine className="text-3xl text-foreground group-hover:text-primary transition-all duration-500" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  Slide
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
