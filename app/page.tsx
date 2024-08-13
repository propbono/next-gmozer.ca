import { Socials } from "@/components/socials";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { RxDownload } from "react-icons/rx";
import { SOCIALS } from "../constants/socials";
import { HeroPhoto } from "@/components/hero-photo";

export default function Home() {
  return (
    <section className="h-full min-h-screen py-6 md:py-24">
      <div className="container mx-auto flex flex-col md:flex-row items-center md:justify-between gap-8 h-full">
        <div className="text-center md:text-left max-w-2xl order-2 md:order-none">
          <span className="text-xl mb-2">Senior Sofwtare Developer</span>
          <h1 className="w-full mb-4 font-logo text-4xl md:text-5xl font-bold leading-relaxed text-foreground">
            Making the Web a{" "}
            <span className="text-primary">More Beautiful Place</span>, One Site
            at a Time.
          </h1>
          <p className="font-body text-xl md:text-2xls font-medium leading-relaxed text-secondary-foreground  md:leading-normal mb-5">
            Full-stack developer turning ideas into innovative web apps with
            React. Check out my latest projects for examples of my expertise in
            web development and see how I can help bring your ideas to life.
          </p>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <Button
              variant="outline"
              className="flex gap-2 items-center uppercase"
            >
              <span>Download resume</span>
              <RxDownload className="text-xl" />
            </Button>
            <Socials
              links={SOCIALS}
              as="div"
              containerStyles="flex gap-6"
              iconStyles="size-9 border border-primary rounded-full flex justify-center items-center text-primary text-base hover:bg-primary hover:text-background hover:transition-all duration-500"
            />
          </div>
        </div>
        <div className="order-1 md:order-none mb-6 md:mb-0">
          <HeroPhoto />
        </div>
      </div>
    </section>
  );
}
