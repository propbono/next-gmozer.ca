"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { PROJECTS } from "@/constants/work";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { RiArrowLeftSLine, RiArrowRightDownLine, RiArrowRightSLine, RiGithubLine } from "react-icons/ri";

// TODO: Add project pictures
// TODO: Add custom logo fonts for headers
// TODO: Add Contact page wit resend
// TODO: Add Hire page
// TODO: Add Theme switch
// TODO: Update colors based on the old website
// TODO: IMplement clean architecture

export default function Work() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  const currentProject = PROJECTS[currentProjectIndex];

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

  return (
    <section className="container flex min-h-[80vh] justify-center py-12">
      <div className="flex w-full flex-col md:flex-row gap-8 items-center md:justify-between">
        <div className="w-full order-1 md:w-1/2 h-[450px] md:min-h-[500px] flex flex-col md:order-none">
          <span className="text-8xl leading-none font-extrabold text-transparent text-outline mb-8">
            {(currentProjectIndex + 1).toString().padStart(2, "0")}
          </span>
          <h2 className="leading-none font-bold text-5xl text-foreground group-hover:text-primary transition-all duration-500 capitalize mb-6">
            {currentProject.title}
          </h2>
          <h3 className="leading-none font-medium text-2x mb-4">{currentProject.category} Project</h3>
          <div className="flex-grow">
            <span className="text-muted-foreground mb-4 line-clamp-2">
              {currentProject.description}
            </span>
          </div>
          <div className="flex flex-wrap gap-4 flex-grow-0 mb-4">
            {currentProject.stack.map((stack, index) => <Badge className="bg-secondary text-secondary-foreground" key={`${stack}-${index}`}>{stack}</Badge>)}
          </div>
          <Separator />
          <div className="flex flex-row justify-between gap-4 mt-4">
            <div className="flex gap-4 items-center">
              {!!currentProject.liveLink
                && (
                  <Link href={currentProject.liveLink}>
                    <Tooltip>
                      <TooltipTrigger className="size-16 rounded-full border border-foreground flex justify-center items-center group">
                        <RiArrowRightDownLine className="text-3xl text-foreground group-hover:text-primary group-hover:-rotate-45 transition-all duration-500" />
                      </TooltipTrigger>
                      <TooltipContent>Live Project</TooltipContent>
                    </Tooltip>
                  </Link>
                )}
              {!!currentProject.githubLink && (
                <Link href={currentProject.githubLink}>
                  <Tooltip>
                    <TooltipTrigger className="size-16 rounded-full border border-foreground flex justify-center items-center group">
                      <RiGithubLine className="text-3xl text-foreground group-hover:text-primary transition-all duration-500" />
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
                    className="size-16 rounded-full border border-foreground flex justify-center items-center group"
                  >
                    <RiArrowLeftSLine className="text-3xl text-foreground group-hover:text-primary transition-all duration-500" />
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
                    className="size-16 rounded-full border border-foreground flex justify-center items-center group"
                  >
                    <RiArrowRightSLine className="text-3xl text-foreground group-hover:text-primary transition-all duration-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Next Project</TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>
        <div className="w-full order-2 md:w-1/2 h-full md:h-[500px]">
          <Carousel setApi={setApi} className="h-full">
            <CarouselContent className="h-full">
              {PROJECTS.map((item, index) => (
                <CarouselItem key={item.title + index} className="h-full">
                  <div className="relative w-full h-full min-h-[500px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
