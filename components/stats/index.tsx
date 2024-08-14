"use client";
import { cn } from "@/lib/utils";
import { type Stat } from "@/types/stats";
import CountUp from "react-countup";
export const Stats = ({ stats }: { stats: Stat[] }) => {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap md:justify-between mx-auto max-w-64 md:max-w-none justify-self-center gap-4">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="flex flex-row gap-4 items-center"
        >
          <CountUp
            end={stat.value}
            duration={5}
            delay={1}
            separator=" "
            className="text-4xl md:text-6xl font-extrabold text-primary"
          />
          <span className={cn("text-lg md:max-w-16 font-medium text-foreground/90")}>
            {stat.title}
          </span>
        </div>
      ))}
    </div>
  );
};
