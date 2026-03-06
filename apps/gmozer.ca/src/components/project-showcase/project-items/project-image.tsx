"use client";

import type { ProjectImageSizes } from "@gmozer/types";
import { cn } from "@gmozer/utils";
import Image from "next/image";
import { payloadImageLoader } from "@/lib/payload-image-loader";

type ProjectImageProps = {
	src?: string;
	alt: string;
	className?: string;
	imageSizes?: ProjectImageSizes | null;
};

export function ProjectImage({
	src,
	alt,
	className,
	imageSizes,
}: ProjectImageProps) {
	const isPayloadMedia = !!imageSizes && !!src;
	const loader = isPayloadMedia
		? payloadImageLoader(imageSizes, src)
		: undefined;

	return (
		<div
			className={cn(
				"relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-muted/50 shadow-xl transition-all duration-500 hover:shadow-2xl hover:border-primary/20",
				className,
			)}
		>
			{src ? (
				<Image
					src={src}
					alt={alt}
					fill
					loader={loader}
					className="object-cover transition-transform duration-700 group-hover:scale-105"
					sizes="(max-width: 1024px) 100vw, 50vw"
				/>
			) : (
				<div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
					No image available
				</div>
			)}
		</div>
	);
}
