import type { CollectionConfig } from "payload";

export const Education: CollectionConfig = {
	slug: "education",
	admin: {
		useAsTitle: "institution",
		defaultColumns: [
			"institution",
			"degree",
			"program",
			"startDate",
			"endDate",
		],
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "institution",
			type: "text",
			required: true,
			localized: true,
		},
		{
			name: "degree",
			type: "text",
			localized: true,
		},
		{
			name: "program",
			type: "text",
			localized: true,
		},
		{
			name: "startDate",
			type: "date",
			required: true,
			admin: {
				date: {
					pickerAppearance: "monthOnly",
					displayFormat: "yyyy",
				},
			},
		},
		{
			name: "currentlyStudying",
			type: "checkbox",
			defaultValue: false,
		},
		{
			name: "endDate",
			type: "date",
			admin: {
				date: {
					pickerAppearance: "monthOnly",
					displayFormat: "yyyy",
				},
				condition: (data) => !data.currentlyStudying,
			},
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
