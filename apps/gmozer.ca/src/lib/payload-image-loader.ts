import {
	type ProjectImageSize,
	type ProjectImageSizes,
	SIZE_BREAKPOINTS,
} from "@gmozer/types";

/**
 * Maps new size names to their equivalent old names for backward compatibility
 * with media uploaded before the rename (card → small, hero → xlarge).
 */
const OLD_SIZE_FALLBACK: Partial<Record<keyof ProjectImageSizes, string>> = {
	small: "card",
	medium: "card", // card (768) sits between small (640) and medium (960)
	xlarge: "hero",
};

/**
 * Returns a custom next/image loader for Payload CMS media.
 *
 * Maps the requested image width to the closest (larger) pre-generated
 * Payload media size URL to avoid unnecessary upscaling.
 *
 * Falls back to old size names (card, hero) for media that was generated
 * before the size rename, so existing images don't break.
 */
export const payloadImageLoader = (
	imageSizes: ProjectImageSizes,
	fallbackSrc: string,
) => {
	// Allow runtime access to old size keys that may exist in the data
	// but aren't in the ProjectImageSizes type anymore.
	const imageSizesAny = imageSizes as Record<
		string,
		ProjectImageSize | null | undefined
	>;

	return ({ width }: { width: number }) => {
		for (const bp of SIZE_BREAKPOINTS) {
			if (bp.width >= width) {
				// Try the current size name first
				if (imageSizes[bp.name]?.url) {
					return imageSizes[bp.name]?.url as string;
				}

				// Fall back to old size name if the new one isn't available
				const oldAlias = OLD_SIZE_FALLBACK[bp.name];
				if (oldAlias && imageSizesAny[oldAlias]?.url) {
					return imageSizesAny[oldAlias]?.url as string;
				}

				// Neither available — keep iterating to find a wider size
			}
		}

		return fallbackSrc;
	};
};
