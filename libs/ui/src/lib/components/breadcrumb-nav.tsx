"use client";

import { Fragment } from "react";
import { RxCaretRight } from "react-icons/rx";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "../ui/breadcrumb";

export type BreadcrumbItemType = {
	label: string;
	href: string;
};

export type BreadcrumbNavProps = {
	items: BreadcrumbItemType[];
};

export const BreadcrumbNav = ({ items }: BreadcrumbNavProps) => {
	return (
		<Breadcrumb className="gap-2 mb-8">
			<BreadcrumbList>
				{items.map(({ href, label }, index) => {
					const isLast = index === items.length - 1;

					return (
						<Fragment key={href}>
							{isLast ? (
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
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
};
