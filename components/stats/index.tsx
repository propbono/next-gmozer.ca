"use client";
import { cn } from "@/lib/utils";
import { type Stat } from "@/types/stats";
import CountUp from "react-countup";
export const Stats = ({ stats }: { stats: Stat[] }) => {
  return (
    <div className="grid grid-cols-2 md:flex md:flex-row md:flex-wrap w-full gap-4 justify-between">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className="flex flex-row gap-4 items-center justify-start md:justify-end"
        >
          <div className="min-w-[4ch] font-mono text-right">
            <CountUp
              end={stat.value}
              duration={5}
              delay={1}
              separator=" "
              className="text-4xl md:text-6xl font-extrabold text-primary"
            />
          </div>
          <span className={cn("text-lg md:max-w-32 font-medium text-foreground/90")}>
            {stat.title}
          </span>
        </div>
      ))}
    </div>
  );
};
