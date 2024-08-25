import { AnimatedCard } from "@/components/animated-card/animated-card";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EXPERIENCE } from "@/constants/resume";

export default function Experience() {
  return (
    <div className="flex flex-col gap-8 text-center md:text-left">
      <h2 className="text-4xl font-bold">{EXPERIENCE.title}</h2>
      <p className="max-w-xl mx-auto md:mx-0 text-muted-foreground">{EXPERIENCE.description}</p>
      <ScrollArea className="h-[400px] 2xl:h-[600px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {EXPERIENCE.items.map((item, index) => (
            <AnimatedCard
              key={`${item.company}-${index}`}
              index={index}
            >
              <CardHeader>
                <span className="text-primary font-semibold">{item.duration}</span>
              </CardHeader>
              <CardContent className="flex justify-center md:justify-start">
                <h3 className="text-xl max-w-64 min-h-14 w-full text-center md:text-left font-bold">{item.position}</h3>
              </CardContent>
              <CardFooter className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className=" rounded-full size-2 bg-primary"></span>
                <span>{item.company}</span>
              </CardFooter>
            </AnimatedCard>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
