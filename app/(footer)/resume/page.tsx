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
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {EXPERIENCE.items.map((item, index) => (
              <li
                key={`${item.company}-${index}`}
                className=" bg-muted-foreground min-h-40 flex flex-col justify-center items-center md:items-start gap-1 rounded-xl px-10 py-6"
              >
                <span className="text-primary font-semibold">{item.duration}</span>
                <h3 className="text-xl max-w-64 min-h-14 text-center md:text-left font-bold">{item.position}</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <span className=" rounded-full size-2 bg-primary"></span>
                  <span className="">{item.company}</span>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </div>
    </TabsContent>
  );
}
