"use client";

import { type HTMLMotionProps, motion } from "framer-motion";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Timeline (container)                                               */
/* ------------------------------------------------------------------ */

type TimelineProps = {
	children: ReactNode;
	className?: string;
};

export const Timeline = ({ children, className }: TimelineProps) => {
	return (
		<div className={`relative pl-2 md:pl-4 pt-2 ${className ?? ""}`}>
			{children}
		</div>
	);
};

/* ------------------------------------------------------------------ */
/*  TimelineItem                                                       */
/* ------------------------------------------------------------------ */

type TimelineItemProps = HTMLMotionProps<"div"> & {
	/** Zero-based index for staggered entrance animation. */
	index: number;
	/** Whether this is the last item (hides the vertical line). */
	isLast?: boolean;
	children: ReactNode;
};

export const TimelineItem = ({
	index,
	isLast = false,
	children,
	...motionProps
}: TimelineItemProps) => {
	return (
		<div className="group relative flex gap-6 md:gap-10 pb-10 last:pb-0 cursor-default">
			{/* Vertical line */}
			{!isLast && (
				<div
					className="absolute left-[11px] top-[24px] bottom-0 w-px bg-gradient-to-b from-primary/60 to-primary/10"
					aria-hidden="true"
				/>
			)}

			{/* Dot */}
			<motion.div
				className="relative flex-shrink-0 mt-1"
				aria-hidden="true"
				initial={{ scale: 0, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{
					duration: 0.4,
					delay: 0.15 * index,
					ease: [0.25, 0.46, 0.45, 0.94],
				}}
			>
				{/* Glow ring — visible on hover only */}
				<div className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/20 group-hover:shadow-[0_0_16px_6px_var(--primary)] group-hover:animate-pulse transition-all duration-300 scale-100 group-hover:scale-150" />
				<div className="relative size-[22px] rounded-full border-2 border-primary bg-background flex items-center justify-center transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_10px_2px_var(--primary)]">
					<div className="size-2.5 rounded-full bg-primary transition-all duration-300 group-hover:shadow-[0_0_8px_3px_var(--primary)]" />
				</div>
			</motion.div>

			{/* Content */}
			<motion.div
				className="flex-1 pb-2 transition-transform duration-300 ease-out group-hover:translate-x-1.5"
				initial={{ opacity: 0, x: -30 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{
					duration: 0.5,
					delay: 0.15 * index + 0.1,
					ease: [0.25, 0.46, 0.45, 0.94],
				}}
				{...motionProps}
			>
				{children}
			</motion.div>
		</div>
	);
};

/* ------------------------------------------------------------------ */
/*  TimelineItemContent helpers                                        */
/* ------------------------------------------------------------------ */

export const TimelineDuration = ({ children }: { children: ReactNode }) => (
	<time className="text-sm font-semibold text-primary tracking-wide uppercase transition-colors duration-300">
		{children}
	</time>
);

export const TimelineTitle = ({ children }: { children: ReactNode }) => (
	<h2 className="mt-1.5 text-lg md:text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
		{children}
	</h2>
);

type TimelineDetailsProps = {
	/** Primary detail (e.g. company or institution). */
	primary: string;
	/** Secondary detail (e.g. location or program). */
	secondary?: string;
};

export const TimelineDetails = ({
	primary,
	secondary,
}: TimelineDetailsProps) => (
	<div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground transition-colors duration-300">
		<span className="flex items-center gap-2">
			<span className="size-1.5 rounded-full bg-primary" />
			{primary}
		</span>
		{secondary && (
			<>
				<span className="hidden sm:inline text-border">•</span>
				<span className="text-muted-foreground/70">{secondary}</span>
			</>
		)}
	</div>
);
