"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { RxCaretRight } from "react-icons/rx";

export const BreadcrumbNav = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(path => path);

  const breadcrumbs = [
    { href: "/", label: "Home" },
    ...paths.slice(0, -1).map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join("/")}`;
      const label = path.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

      return { href, label };
    }),
    {
      href: pathname,
      label: paths[paths.length - 1]?.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" "),
      current: true,
    },
  ];

  return (
    <Breadcrumb className="gap-2 mb-8">
      <BreadcrumbList>
        {breadcrumbs.map(({ href, label, current }) => (
          <>
            {current
              ? (
                <BreadcrumbItem key={href}>
                  <span className="text-foreground">{label}</span>
                </BreadcrumbItem>
              )
              : (
                <>
                  <BreadcrumbItem key={href}>
                    <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator>
                    <RxCaretRight />
                  </BreadcrumbSeparator>
                </>
              )}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
