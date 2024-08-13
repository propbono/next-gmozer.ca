"use client";
import { cn } from "@/lib/utils";
import { type Stat } from "@/types/stats";
import CountUp from "react-countup";
export const Stats = ({ stats }: { stats: Stat[] }) => {
  return (
    <section className="container">
      <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="flex flex-row flex-nowrap gap-4 items-center justify-center md:justify-start"
          >
            <CountUp
              end={stat.value}
              duration={5}
              delay={1}
              separator=" "
              className="text-4xl md:text-6xl font-extrabold text-primary"
            />
            <span className={cn("text-lg font-medium max-w-28 text-foreground/90", { "max-w-40": stat.title.length > 15 })}>
              {stat.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
