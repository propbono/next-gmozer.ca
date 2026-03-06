import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
	slug: "media",
	upload: {
		imageSizes: [
			{
				name: "thumbnail",
				width: 400,
				height: 300,
				position: "centre",
			},
			{
				name: "small",
				width: 640,
				height: undefined,
				position: "centre",
			},
			{
				name: "medium",
				width: 960,
				height: undefined,
				position: "centre",
			},
			{
				name: "large",
				width: 1280,
				height: undefined,
				position: "centre",
			},
			{
				name: "xlarge",
				width: 1920,
				height: undefined,
				position: "centre",
			},
		],
		adminThumbnail: "thumbnail",
		mimeTypes: ["image/*"],
	},
	fields: [
		{
			name: "alt",
			type: "text",
			required: true,
		},
	],
};
