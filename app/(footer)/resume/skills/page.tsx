import { constructMetadata } from "@/app/metadata";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SKILLS } from "@/constants/resume";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "Technical Skills | Greg Mozer",
  description: "Explore my technical expertise across various technologies including React, Next.js, TypeScript, and modern web development tools.",
});

export default function Skills() {
  return (
    <section className="flex flex-col gap-8">
      <header className="flex flex-col gap-8 text-center md:text-left">
        <h1 className="font-bold text-4xl">{SKILLS.title}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto md:mx-0">{SKILLS.description}</p>
      </header>
      <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-8" aria-label="Technical skills">
        {SKILLS.items.map((skill) => (
          <li key={skill.name}>
            <Tooltip>
              <TooltipTrigger className="w-full flex-col gap-2 h-40 bg-background text-foreground rounded-xl flex justify-center items-center group" asChild>
                <Link href={skill.link} target="_blank">
                  <div className="text-6xl group-hover:text-primary transition-all duration-300">{skill.icon}</div>
                  <span className="not-sr-only sm:sr-only">{skill.name}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent className="capitalize">{skill.name}</TooltipContent>
            </Tooltip>
          </li>
        ))}
      </ul>
    </section>
  );
}
