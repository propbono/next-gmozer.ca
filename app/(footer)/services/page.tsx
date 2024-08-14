"use client";
import { Separator } from "@/components/ui/separator";
import { SERVICES } from "@/constants/services";
import { motion } from "framer-motion";
import Link from "next/link";
import { RiArrowDownSLine, RiArrowDownWideLine, RiArrowDropRightLine, RiArrowRightDownLine } from "react-icons/ri";

export default function Services() {
  return (
    <section className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {SERVICES.map((service, index) => (
          <motion.div
            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.5,
                delay: index * 0.2,
              },
            }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            key={service.title}
            className="flex flex-1 flex-col justify-center gap-6 group"
          >
            <div className="flex w-full justify-between items-center text-5xl font-extrabold">
              <span className="text-transparent text-outline hover:text-outline-hover group-hover:text-outline-hover transition-all delay-100 duration-500">
                {(index + 1).toString().padStart(2, "0")}
              </span>
              <Link
                href={service.href}
                className="size-11 flex items-center justify-center border-foreground border rounded-full hover:border-primary text-3xl hover:-rotate-45 hover:text-primary group-hover:border-primary group-hover:text-primary transition-all delay-100 duration-500"
              >
                <RiArrowRightDownLine />
              </Link>
            </div>

            <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-all duration-500">{service.title}</h3>
            <p className="text-lg leading-snug">{service.description}</p>
            <Separator />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
