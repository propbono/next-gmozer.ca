import { constructMetadata } from "@/app/metadata";
import { AnimatedElement } from "@/components/animated-element/animated-element";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EDUCATION } from "@/constants/resume";

export const metadata = constructMetadata({
  title: "Education & Qualifications | Greg Mozer",
  description: "Discover my educational background, certifications, and continuous learning journey in software development and web technologies.",
});

export default function Education() {
  return (
    <section className="flex flex-col gap-8">
      <header className="flex flex-col gap-8 text-center md:text-left">
        <h1 className="text-4xl font-bold">{EDUCATION.title}</h1>
        <p className="max-w-xl mx-auto md:mx-0 text-muted-foreground">{EDUCATION.description}</p>
      </header>
      <ScrollArea className="h-[400px] 2xl:h-[600px]">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2" aria-label="Education timeline">
          {EDUCATION.items.map((item, index) => (
            <AnimatedElement index={index} key={`${item.institution}-${index}`}>
              <Card>
                <CardHeader>
                  <time className="text-primary font-semibold">{item.duration}</time>
                </CardHeader>
                <CardContent>
                  <h2 className="text-xl text-center md:text-left font-bold">{item.degree}</h2>
                </CardContent>
                <CardFooter className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className="rounded-full size-2 bg-primary"></span>
                  <span>{item.institution}</span>
                </CardFooter>
              </Card>
            </AnimatedElement>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
}
