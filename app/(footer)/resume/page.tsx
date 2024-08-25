import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TabsContent } from "@/components/ui/tabs";
import { EXPERIENCE } from "@/constants/resume";

export default function Experience() {
  return (
    <TabsContent value="experience">
      <div className="flex flex-col gap-8 text-center md:text-left">
        <h2 className="text-4xl font-bold">{EXPERIENCE.title}</h2>
        <p className="max-w-xl mx-auto md:mx-0 text-muted-foreground">{EXPERIENCE.description}</p>
        <ScrollArea className="h-[400px]">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {EXPERIENCE.items.map((item, index) => (
              <Card
                key={`${item.company}-${index}`}
              >
                <CardHeader>
                  <span className="text-primary font-semibold">{item.duration}</span>
                </CardHeader>
                <CardContent>
                  <h3 className="text-xl max-w-64 min-h-14 text-center md:text-left font-bold">{item.position}</h3>
                </CardContent>
                <CardFooter className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  <span className=" rounded-full size-2 bg-primary"></span>
                  <span>{item.company}</span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </TabsContent>
  );
}
