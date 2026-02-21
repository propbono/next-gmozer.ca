"use client";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@gmozer/ui";
import { Fragment } from "react";
import { RxCaretRight } from "react-icons/rx";
import { usePathname } from "@/i18n/navigation";

export const BreadcrumbNav = () => {
	const pathname = usePathname();
	const paths = pathname.split("/").filter((path) => path);

	const breadcrumbs = [
		{ href: "/", label: "Home", current: false },
		...paths.map((path, index) => {
			const href = `/${paths.slice(0, index + 1).join("/")}`;
			const label = path
				.split("-")
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(" ");

			return {
				href,
				label,
				current: path === paths[paths.length - 1],
			};
		}),
	];

	return (
		<Breadcrumb className="gap-2 mb-8">
			<BreadcrumbList>
				{breadcrumbs.map(({ href, label, current }) => (
					<Fragment key={href}>
						{current ? (
							<BreadcrumbItem>
								<span className="text-primary font-semibold">{label}</span>
							</BreadcrumbItem>
						) : (
							<>
								<BreadcrumbItem>
									<BreadcrumbLink href={href}>{label}</BreadcrumbLink>
								</BreadcrumbItem>
								<BreadcrumbSeparator>
									<RxCaretRight />
								</BreadcrumbSeparator>
							</>
						)}
					</Fragment>
				))}
			</BreadcrumbList>
		</Breadcrumb>
	);
};
