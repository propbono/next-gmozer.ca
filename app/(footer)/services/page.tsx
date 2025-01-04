import { constructMetadata } from "@/app/metadata";
import { AnimatedElement } from "@/components/animated-element/animated-element";
import { Separator } from "@/components/ui/separator";
import { SERVICES } from "@/constants/services";
import Link from "next/link";
import { RiArrowRightDownLine } from "react-icons/ri";

export const metadata = constructMetadata({
  title: "Services | Greg Mozer",
  description: "Comprehensive web development services including frontend development, UI/UX design, SEO optimization, and mobile app development.",
});

export default function Services() {
  return (
    <section className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {SERVICES.map((service, index) => (
          <AnimatedElement
            index={index}
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
          </AnimatedElement>
        ))}
      </div>
    </section>
  );
}
