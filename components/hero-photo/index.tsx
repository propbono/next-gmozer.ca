"use client";
import { motion } from "framer-motion";
import Image from "next/image";
export const HeroPhoto = () => {
	return (
		<div className="w-full h-full relative">
			<motion.div
				initial={{ opacity: 0 }}
				animate={{
					opacity: 1,
					transition: { delay: 0.5, duration: 0.4, ease: "easeIn" },
				}}
			>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{
						opacity: 1,
						transition: { delay: 0.5, duration: 0.4, ease: "easeInOut" },
					}}
					className="absolute w-[298px] h-[298px] md:w-[398px] md:h-[398px] 2xl:w-[498px] 2xl:h-[498px]"
				>
					<Image
						priority
						quality={100}
						fill
						className="object-contain"
						alt="Raccon"
						src="/images/Raccoon_1-min.png"
					/>
				</motion.div>

				<motion.svg
					className="w-[302px] h-[302px] md:w-[402px] md:h-[402px] 2xl:w-[502px] 2xl:h-[502px]"
					fill="transparent"
					viewBox="0 0 504 504"
					xmlns="http://www.w3.org/2000/svg"
				>
					<title className="sr-only">Hero svg</title>
					<motion.circle
						cx="253"
						cy="253"
						r="250"
						stroke="var(--primary)"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
						initial={{ strokeDasharray: "24 10 0 0" }}
						animate={{
							strokeDasharray: ["15 128 25 25", "16 25 92 72", "4 250 22 22"],
							rotate: [120, 360],
						}}
						transition={{
							duration: 20,
							repeat: Number.POSITIVE_INFINITY,
							repeatType: "reverse",
						}}
					/>
				</motion.svg>
			</motion.div>
		</div>
	);
};
