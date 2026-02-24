"use client";
import type { Stat } from "@gmozer/types";
import { StatItem } from "./stat";

export const Stats = ({ stats }: { stats: Stat[] }) => {
	return (
		<div className="flex flex-col md:flex-row md:flex-wrap w-full gap-4 justify-between">
			{stats.map((stat) => (
				<StatItem key={stat.title} stat={stat} />
			))}
		</div>
	);
};
