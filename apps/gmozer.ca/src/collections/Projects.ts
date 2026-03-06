import type { CollectionConfig } from "payload";

export const Projects: CollectionConfig = {
	slug: "projects",
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "category", "order"],
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
			localized: true,
		},
		{
			name: "category",
			type: "text",
			required: true,
			localized: true,
		},
		{
			name: "description",
			type: "textarea",
			required: true,
			localized: true,
		},
		{
			name: "image",
			type: "upload",
			relationTo: "media",
		},
		{
			name: "stack",
			type: "array",
			fields: [
				{
					name: "name",
					type: "text",
				},
			],
		},
		{
			name: "liveLink",
			type: "text",
		},
		{
			name: "githubLink",
			type: "text",
		},
		{
			name: "order",
			type: "number",
			admin: {
				position: "sidebar",
			},
		},
	],
};
