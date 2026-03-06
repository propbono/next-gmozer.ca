import { type ProjectImageSizes, SIZE_BREAKPOINTS } from "@gmozer/types";

/**
 * Returns a custom next/image loader for Payload CMS media.
 *
 * Maps the requested image width to the closest (larger) pre-generated
 * Payload media size URL to avoid unnecessary upscaling.
 */
export const payloadImageLoader = (
	imageSizes: ProjectImageSizes,
	fallbackSrc: string,
) => {
	return ({ width }: { width: number }) => {
		// next/image requests specific widths based on deviceSizes and imageSizes (e.g. 256, 384, 640, 750, etc)
		// We want to serve the smallest Payload pre-generated size that is at least as wide as requested
		for (const bp of SIZE_BREAKPOINTS) {
			if (bp.width >= width && imageSizes[bp.name]?.url) {
				return imageSizes[bp.name]?.url as string;
			}
		}

		// Fallback to original if no matching size found or image is larger than breakpoints
		return fallbackSrc;
	};
};
