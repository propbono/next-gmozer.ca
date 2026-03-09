import type { GlobalConfig } from "payload";

export const AboutMe: GlobalConfig = {
	slug: "about-me",
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
			name: "description",
			type: "textarea",
			required: true,
			localized: true,
		},
		{
			name: "name",
			type: "text",
			required: true,
			localized: true,
		},
		{
			name: "phone",
			type: "text",
			required: true,
			localized: true,
		},
		{
			name: "email",
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
			name: "nationality",
			type: "text",
			required: true,
			localized: true,
		},
		{
			name: "languages",
			type: "array",
			required: true,
			localized: true,
			fields: [
				{
					name: "language",
					type: "text",
					required: true,
				},
			],
		},
	],
};
