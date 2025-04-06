"use client";

import { type HTMLMotionProps, motion } from "framer-motion";
import type { ReactNode } from "react";

type AnimatedCardProps = HTMLMotionProps<"div"> & {
	children: ReactNode;
	index: number;
};

export const AnimatedElement = ({
	index,
	children,
	...otherProps
}: AnimatedCardProps) => {
	return (
		<motion.div
			initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
			animate={{
				opacity: 1,
				x: 0,
				transition: {
					duration: 1,
					delay: 0.2 * index,
				},
			}}
			{...otherProps}
		>
			{children}
		</motion.div>
	);
};
