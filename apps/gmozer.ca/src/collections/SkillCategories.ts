import type { CollectionConfig } from "payload";

export const SkillCategories: CollectionConfig = {
	slug: "skill-categories",
	admin: {
		useAsTitle: "title",
		defaultColumns: ["title", "slug", "order"],
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
			name: "slug",
			type: "text",
			required: true,
			unique: true,
			index: true,
			admin: {
				description:
					"Unique identifier for this category (e.g., frontend, backend)",
			},
		},
		{
			name: "order",
			type: "number",
			required: true,
			defaultValue: 0,
			admin: {
				description: "Order of the category on the page",
			},
		},
		{
			name: "skills",
			type: "array",
			required: true,
			admin: {
				components: {
					RowLabel: "/components/payload/SkillRowLabel#SkillRowLabel",
				},
			},
			fields: [
				{
					name: "name",
					type: "text",
					required: true,
					localized: true,
				},
				{
					name: "link",
					type: "text",
				},
				{
					name: "iconName",
					type: "text",
					required: true,
					admin: {
						components: {
							Field: "/components/payload/IconPicker#IconPicker",
						},
					},
				},
			],
		},
	],
};
