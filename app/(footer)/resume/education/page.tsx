import { AnimatedCard } from "@/components/animated-card/animated-card";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EDUCATION } from "@/constants/resume";

export default function Education() {
  return (
    <div className="flex flex-col gap-8 text-center md:text-left">
      <h2 className="text-4xl font-bold">{EDUCATION.title}</h2>
      <p className="max-w-xl mx-auto md:mx-0 text-muted-foreground">{EDUCATION.description}</p>
      <ScrollArea className="h-[400px] 2xl:h-[600px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {EDUCATION.items.map((item, index) => (
            <AnimatedCard index={index} key={`${item.institution}-${index}`}>
              <CardHeader>
                <span className="text-primary font-semibold">{item.duration}</span>
              </CardHeader>
              <CardContent>
                <h3 className="text-xl text-center md:text-left font-bold">{item.degree}</h3>
              </CardContent>
              <CardFooter className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="rounded-full size-2 bg-primary"></span>
                <span>{item.institution}</span>
              </CardFooter>
            </AnimatedCard>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
