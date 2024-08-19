import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TABS } from "@/constants/resume";
import Link from "next/link";

export default function ResumeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="min-h-[80vh] flex">
      <div className="container mx-auto">
        <Tabs defaultValue="experience" className="flex flex-col md:flex-row gap-16">
          <TabsList className="flex flex-col w-full max-w-96 mx-auto md:mx-0 gap-6">
            {TABS.map((tab) => (
              <TabsTrigger asChild key={tab.label} value={tab.label.toLowerCase()}>
                <Link href={tab.url}>{tab.label}</Link>
              </TabsTrigger>
            ))}
          </TabsList>
          {children}
        </Tabs>
      </div>
    </section>
  );
}
