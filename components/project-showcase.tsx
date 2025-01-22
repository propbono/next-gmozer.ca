"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PROJECTS } from "@/constants/work";
import { useElementSize } from "@/hooks/use-element-size";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RiArrowLeftSLine, RiArrowRightDownLine, RiArrowRightSLine, RiGithubLine } from "react-icons/ri";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

export function ProjectShowcase() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [ref, { width, height }] = useElementSize();

  const currentProject = useMemo(() => PROJECTS[currentProjectIndex], [currentProjectIndex]);

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
      setCurrentProjectIndex(prev => prev + 1);
    }
  }, [api, setCurrentProjectIndex]);

  const handlePrevious = useCallback(() => {
    if (api && api.canScrollPrev()) {
      api.scrollPrev();
      setCurrentProjectIndex(prev => prev - 1);
    }
  }, [api, setCurrentProjectIndex]);

  console.log("Width: ", width);
  console.log("Height: ", height);

  return (
    <article className="flex flex-grow relative">
      <div
        ref={ref}
        className="hidden sm:block absolute md:rounded-s-lg w-full md:w-[768px] lg:w-[872px] xl:w-[1024px] 2xl:w-[1124px] h-full top-0 right-0"
      >
        <Carousel setApi={setApi} className="h-full">
          <CarouselContent className="h-full">
            {PROJECTS.map((item, index) => (
              <CarouselItem key={item.title + index} className="h-full">
                <div className="relative w-full h-full" style={{ height: `${height}px` }}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover md:rounded-s-lg"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="container flex flex-grow items-center justify-start">
        <Card className="w-full sm:w-[672px] h-[600px] z-10 shadow-lg shadow-white/75">
          <CardContent className="h-full flex flex-col p-6">
            <div className="flex-shrink-0">
              <span className="text-8xl leading-none font-extrabold text-transparent text-outline mb-8 block">
                {(currentProjectIndex + 1).toString().padStart(2, "0")}
              </span>
              <h1
                id="project-title"
                className="leading-tight font-bold text-4xl sm:text-5xl text-foreground group-hover:text-primary transition-all duration-500 capitalize mb-6 line-clamp-2"
              >
                {currentProject.title}
              </h1>
              <h2 className="leading-none font-medium text-2x mb-4">
                {currentProject.category} Project
              </h2>
            </div>

            <div className="flex-grow flex flex-col justify-between min-h-0">
              <span className="text-muted-foreground mb-4 line-clamp-2">
                {currentProject.description}
              </span>

              <div className="flex flex-wrap gap-2 overflow-y-auto max-h-24 mb-4">
                {currentProject.stack.map((stack, index) => (
                  <Badge
                    className="bg-secondary text-secondary-foreground flex-shrink-0"
                    key={`${stack}-${index}`}
                  >
                    {stack}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex-shrink-0 mt-auto pt-4">
              <Separator className="mb-4" />
              <div className="flex flex-row justify-between gap-4">
                <div className="flex gap-4 items-center">
                  {!!currentProject.liveLink
                    && (
                      <Link href={currentProject.liveLink}>
                        <Tooltip>
                          <TooltipTrigger className="size-16 rounded-full border border-foreground flex justify-center items-center group hover:border-primary hover:border-2 hover:border-dashed hover:transition-all hover:duration-100">
                            <RiArrowRightDownLine className="text-3xl text-foreground group-hover:text-primary group-hover:-rotate-45 transition-all duration-500" />
                            <span className="sr-only">{currentProject.title} - Live Project</span>
                          </TooltipTrigger>
                          <TooltipContent>Live Project</TooltipContent>
                        </Tooltip>
                      </Link>
                    )}
                  {!!currentProject.githubLink && (
                    <Link href={currentProject.githubLink}>
                      <Tooltip>
                        <TooltipTrigger className="size-16 rounded-full border border-foreground flex justify-center items-center group hover:border-primary hover:border-2 hover:border-dashed hover:transition-all hover:duration-100">
                          <RiGithubLine className="text-3xl text-foreground group-hover:text-primary transition-all duration-500" />
                          <span className="sr-only">{currentProject.title} - Github Repository</span>
                        </TooltipTrigger>
                        <TooltipContent>Github Repository</TooltipContent>
                      </Tooltip>
                    </Link>
                  )}
                </div>
                <div className="flex gap-4 items-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={handlePrevious}
                        disabled={!api?.canScrollPrev()}
                        variant="ghost"
                        className="size-16 rounded-full border border-foreground flex justify-center items-center group hover:bg-white hover:border-primary hover:border-2 hover:border-dashed hover:transition-all hover:duration-100"
                      >
                        <RiArrowLeftSLine className="text-3xl text-foreground group-hover:text-primary transition-all duration-500" />
                        <span className="sr-only">Previous Project</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Previous Project</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={handleNext}
                        disabled={!api?.canScrollNext()}
                        variant="ghost"
                        className="size-16 rounded-full border border-foreground flex justify-center items-center group hover:bg-white hover:border-primary hover:border-2 hover:border-dashed hover:transition-all hover:duration-100"
                      >
                        <RiArrowRightSLine className="text-3xl text-foreground group-hover:text-primary transition-all duration-500" />
                        <span className="sr-only">Next Project</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Next Project</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </article>
  );
}
