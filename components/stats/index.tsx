"use client";
import { cn } from "@/lib/utils";
import { type Stat } from "@/types/stats";
import CountUp from "react-countup";
export const Stats = ({ stats }: { stats: Stat[] }) => {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap w-full gap-4 justify-between">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="flex flex-row gap-4 items-center justify-end"
        >
          <CountUp
            end={stat.value}
            duration={5}
            delay={1}
            separator=" "
            className="text-4xl md:text-6xl font-extrabold text-primary"
          />
          <span className={cn("text-lg md:max-w-32 font-medium text-foreground/90")}>
            {stat.title}
          </span>
        </div>
      ))}
    </div>
  );
};
