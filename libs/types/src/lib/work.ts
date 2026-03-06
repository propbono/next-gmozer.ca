export type ProjectImageSize = {
	url?: string | null;
	width?: number | null;
};

export type ProjectImageSizes = {
	thumbnail?: ProjectImageSize | null;
	small?: ProjectImageSize | null;
	medium?: ProjectImageSize | null;
	large?: ProjectImageSize | null;
	xlarge?: ProjectImageSize | null;
};

export const SIZE_BREAKPOINTS = [
	{ name: "thumbnail" as const, width: 400 },
	{ name: "small" as const, width: 640 },
	{ name: "medium" as const, width: 960 },
	{ name: "large" as const, width: 1280 },
	{ name: "xlarge" as const, width: 1920 },
] as const;

export type Project = {
	title: string;
	category: string;
	description: string;
	liveLink?: string;
	githubLink: string;
	stack: string[];
	image?: string;
	imageSizes?: ProjectImageSizes | null;
};
