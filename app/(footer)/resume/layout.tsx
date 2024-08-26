"use client";

import { TABS } from "@/constants/resume";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function ResumeLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <section className="min-h-[80vh] flex">
      <div className="container">
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-16">
          <nav className="flex flex-col w-full max-w-96 mx-auto md:mx-0 gap-6 h-auto rounded-md p-1 text-foreground">
            {TABS.map((tab) => {
              const isActive = pathname === tab.url;

              return (
                <Link
                  key={tab.label}
                  href={tab.url}
                  className={cn(
                    "inline-flex items-center w-full bg-white justify-center whitespace-nowrap text-foreground rounded-lg p-3 text-balance font-medium ring-offset-white transition-all",
                    {
                      "text-background shadow-sm font-bold bg-primary": isActive,
                    },
                  )}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex-grow h-full">{children}</div>
        </div>
      </div>
    </section>
  );
}
