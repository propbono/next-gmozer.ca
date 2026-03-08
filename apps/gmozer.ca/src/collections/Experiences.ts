import type { CollectionConfig } from "payload";

export const Experiences: CollectionConfig = {
	slug: "experiences",
	admin: {
		useAsTitle: "position",
		defaultColumns: ["position", "company", "startDate", "endDate", "order"],
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "position",
			type: "text",
			required: true,
			localized: true,
		},
		{
			name: "company",
			type: "text",
			required: true,
			localized: true,
		},
		{
			name: "location",
			type: "text",
			required: true,
			localized: true,
		},
		{
			name: "startDate",
			type: "date",
			required: true,
			admin: {
				date: {
					pickerAppearance: "monthOnly",
					displayFormat: "MMMM yyyy",
				},
			},
		},
		{
			name: "currentlyWorking",
			type: "checkbox",
			defaultValue: false,
		},
		{
			name: "endDate",
			type: "date",
			admin: {
				date: {
					pickerAppearance: "monthOnly",
					displayFormat: "MMMM yyyy",
				},
				condition: (data) => !data.currentlyWorking,
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
