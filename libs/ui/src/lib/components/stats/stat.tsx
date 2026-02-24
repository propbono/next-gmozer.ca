import type { Stat } from "@gmozer/types";
import { cn } from "@gmozer/utils";
import { useState } from "react";
import CountUp from "react-countup";

const getDuration = (value: number): number => {
	if (value <= 20) return 2;
	if (value <= 100) return 3;
	if (value <= 500) return 4;
	return 5;
};

export const StatItem = ({ stat }: { stat: Stat }) => {
	const [showSuffix, setShowSuffix] = useState(false);

	return (
		<div className="grid grid-cols-2 md:flex md:flex-row gap-9 md:gap-4 items-center md:justify-end">
			<div className="min-w-[4ch] font-mono text-right flex items-center justify-end">
				<CountUp
					end={stat.value}
					duration={getDuration(stat.value)}
					delay={1}
					separator=" "
					onEnd={() => setShowSuffix(true)}
					className="text-4xl md:text-6xl font-extrabold text-primary"
				/>
				{stat.suffix && (
					<span
						className={cn(
							"text-2xl md:text-4xl font-extrabold text-primary transition-opacity duration-300",
							showSuffix ? "opacity-100" : "opacity-0",
						)}
					>
						{stat.suffix}
					</span>
				)}
			</div>
			<span
				className={cn("text-lg md:max-w-32 font-medium text-foreground/90")}
			>
				{stat.title}
			</span>
		</div>
	);
};
