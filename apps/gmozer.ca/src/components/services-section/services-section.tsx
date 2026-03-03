"use client";

import { cn } from "@gmozer/utils";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { RiArrowRightLine } from "react-icons/ri";
import { Link } from "@/i18n/navigation";

export type ServiceItem = {
	title: string;
	description: string;
	url: string;
	icon: ReactNode;
};

type ServicesSectionProps = {
	services: ServiceItem[];
	className?: string;
};

const container: Variants = {
	hidden: { opacity: 0 },
	show: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
			delayChildren: 0.1,
		},
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const lineVariants: Variants = {
	hidden: { scaleX: 0, originX: 0 },
	show: {
		scaleX: 1,
		originX: 0,
		transition: { duration: 0.8, ease: "easeInOut", delay: 0.2 },
	},
};

const ServiceListItem = ({
	service,
	index,
}: {
	service: ServiceItem;
	index: number;
}) => {
	const t = useTranslations("services");

	return (
		<motion.div variants={itemVariants} className="h-full">
			<Link href={service.url} className="block h-full group">
				<div className="flex flex-col gap-6 h-full">
					<div className="relative pb-6">
						<motion.div
							variants={lineVariants}
							className="absolute bottom-0 left-0 w-full h-px bg-border/40 group-hover:bg-primary/50 transition-colors duration-300"
						/>
						<div className="flex w-full justify-between items-start">
							<span className="text-4xl font-extrabold text-muted-foreground/20 transition-colors duration-300 group-hover:text-primary/40 select-none font-mono">
								{(index + 1).toString().padStart(2, "0")}
							</span>
							<span className="text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
								{service.icon}
							</span>
						</div>
					</div>

					<div className="space-y-4 flex-grow">
						<h3 className="text-3xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors duration-300">
							{service.title}
						</h3>
						<p className="text-lg text-muted-foreground leading-relaxed">
							{service.description}
						</p>
					</div>

					<div className="flex items-center gap-2 text-base font-semibold text-primary transition-all duration-300 group-hover:translate-x-2">
						<span>{t("learnMore")}</span>
						<RiArrowRightLine className="transition-transform duration-300 group-hover:translate-x-1" />
					</div>
				</div>
			</Link>
		</motion.div>
	);
};

export const ServicesSection = ({
	services,
	className,
}: ServicesSectionProps) => {
	return (
		<motion.div
			variants={container}
			initial="hidden"
			whileInView="show"
			viewport={{ once: true, margin: "-50px" }}
			className={cn(
				"grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24",
				className,
			)}
		>
			{services.map((service, index) => (
				<ServiceListItem key={service.url} service={service} index={index} />
			))}
		</motion.div>
	);
};
