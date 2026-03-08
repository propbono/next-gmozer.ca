import { getPayloadClient } from "@/lib/payload";

const educationData = [
	{
		order: 1,
		en: {
			institution: "AWS",
			degree: "AWS Certified Cloud Practitioner",
			program: "",
		},
		pl: {
			institution: "AWS",
			degree: "AWS Certified Cloud Practitioner",
			program: "",
		},
		startDate: "2023-01-01T00:00:00Z",
		endDate: "2025-12-31T00:00:00Z",
		currentlyStudying: false,
	},
	{
		order: 2,
		en: {
			institution: "WIT Academy, Warsaw, Poland",
			degree: "N/A",
			program: "Computer Science",
		},
		pl: {
			institution: "Akademia WIT, Warszawa, Polska",
			degree: "N/A",
			program: "Informatyka",
		},
		startDate: "2008-01-01T00:00:00Z",
		endDate: "2010-12-31T00:00:00Z",
		currentlyStudying: false,
	},
	{
		order: 3,
		en: {
			institution: "Uczelnia Warszawska, Warsaw, Poland",
			degree: "Bachelor of Engineering",
			program: "Computer Science and Econometrics",
		},
		pl: {
			institution: "Uczelnia Warszawska, Warszawa, Polska",
			degree: "Inżynier",
			program: "Informatyka i ekonometria",
		},
		startDate: "2004-01-01T00:00:00Z",
		endDate: "2008-12-31T00:00:00Z",
		currentlyStudying: false,
	},
];

async function seed() {
	const payload = await getPayloadClient();

	// biome-ignore lint/suspicious/noConsole: Seed script logging
	console.log("🌱 Seeding education...");

	for (const entry of educationData) {
		// Create with English locale
		const doc = await payload.create({
			collection: "education",
			locale: "en",
			data: {
				institution: entry.en.institution,
				degree: entry.en.degree,
				program: entry.en.program,
				startDate: entry.startDate,
				endDate: entry.endDate,
				currentlyStudying: entry.currentlyStudying,
				order: entry.order,
			},
		});

		// Update with Polish locale
		await payload.update({
			collection: "education",
			id: doc.id,
			locale: "pl",
			data: {
				institution: entry.pl.institution,
				degree: entry.pl.degree,
				program: entry.pl.program,
			},
		});

		// biome-ignore lint/suspicious/noConsole: Seed script logging
		console.log(`  ✅ ${entry.en.institution}`);
	}

	// biome-ignore lint/suspicious/noConsole: Seed script logging
	console.log("🌱 Done! Seeded", educationData.length, "education entries.");
	process.exit(0);
}

seed().catch((error) => {
	// biome-ignore lint/suspicious/noConsole: Seed script error
	console.error("❌ Seed failed:", error);
	process.exit(1);
});
