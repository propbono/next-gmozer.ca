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
    <section className="container  min-h-[80vh] justify-center py-12">
      <div className="flex flex-col md:flex-row gap-8 items-center md:justify-between">
        <div className="w-full order-1 md:w-1/2 min-h-[500px] flex flex-col md:order-none border border-pink-500">
          <span className="text-8xl leading-none font-extrabold text-transparent text-outline mb-8">
            {(currentProjectIndex + 1).toString().padStart(2, "0")}
          </span>
          <h2 className="leading-none font-bold text-5xl text-foreground group-hover:text-primary transition-all duration-500 capitalize mb-6">
            {currentProject.title}
          </h2>
          <h3 className="leading-none font-medium text-2x mb-4">{currentProject.category} Project</h3>
          <p className="text-muted-foreground flex-grow mb-4">
            {currentProject.description}
          </p>
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
        <div className="w-full order-2 md:w-1/2 h-64 md:h-[500px] border border-green-600">
          <Carousel setApi={setApi}>
            <CarouselContent>
              {PROJECTS.map((item, index) => (
                <CarouselItem key={item.title + index}>
                  <Image src={item.image} alt={item.title} width={650} height={500} loading="lazy" className="object-cover w-full h-full" />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
