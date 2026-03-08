import { getPayloadClient } from "@/lib/payload";

const experienceData = [
	{
		order: 1,
		en: {
			position: "Senior Software Developer",
			company: "Heineken",
			location: "Krakow, Poland",
		},
		pl: {
			position: "Starszy programista",
			company: "Heineken",
			location: "Kraków, Polska",
		},
		startDate: "2024-12-01",
		endDate: null,
		currentlyWorking: true,
	},
	{
		order: 2,
		en: {
			position: "Senior Software Developer",
			company: "Rangle.io",
			location: "Toronto, ON, Canada",
		},
		pl: {
			position: "Starszy programista",
			company: "Rangle.io",
			location: "Toronto, ON, Kanada",
		},
		startDate: "2023-11-01",
		endDate: "2024-12-01",
		currentlyWorking: false,
	},
	{
		order: 3,
		en: {
			position: "Senior Software Developer",
			company: "CGI (TSX: GIB.A)",
			location: "Toronto, ON, Canada",
		},
		pl: {
			position: "Starszy programista",
			company: "CGI (TSX: GIB.A)",
			location: "Toronto, ON, Kanada",
		},
		startDate: "2023-01-01",
		endDate: "2023-11-01",
		currentlyWorking: false,
	},
	{
		order: 4,
		en: {
			position: "Software Developer",
			company: "CGI (TSX: GIB.A)",
			location: "Toronto, ON, Canada",
		},
		pl: {
			position: "Programista",
			company: "CGI (TSX: GIB.A)",
			location: "Toronto, ON, Kanada",
		},
		startDate: "2021-08-01",
		endDate: "2023-01-01",
		currentlyWorking: false,
	},
	{
		order: 5,
		en: {
			position: "Software Developer",
			company: "DCM (TSX: DCM)",
			location: "Mississauga, ON, Canada",
		},
		pl: {
			position: "Programista",
			company: "DCM (TSX: DCM)",
			location: "Mississauga, ON, Kanada",
		},
		startDate: "2018-12-01",
		endDate: "2021-08-01",
		currentlyWorking: false,
	},
];

async function seed() {
	const payload = await getPayloadClient();

	// biome-ignore lint/suspicious/noConsole: Seed script logging
	console.log("🌱 Seeding experiences...");

	for (const entry of experienceData) {
		// Create with English locale
		const doc = await payload.create({
			collection: "experiences",
			locale: "en",
			data: {
				position: entry.en.position,
				company: entry.en.company,
				location: entry.en.location,
				startDate: entry.startDate,
				endDate: entry.endDate,
				currentlyWorking: entry.currentlyWorking,
				order: entry.order,
			},
		});

		// Update with Polish locale
		await payload.update({
			collection: "experiences",
			id: doc.id,
			locale: "pl",
			data: {
				position: entry.pl.position,
				company: entry.pl.company,
				location: entry.pl.location,
			},
		});

		// biome-ignore lint/suspicious/noConsole: Seed script logging
		console.log(`  ✅ ${entry.en.company} — ${entry.en.position}`);
	}

	// biome-ignore lint/suspicious/noConsole: Seed script logging
	console.log("🌱 Done! Seeded", experienceData.length, "experiences.");
	process.exit(0);
}

seed().catch((error) => {
	// biome-ignore lint/suspicious/noConsole: Seed script error
	console.error("❌ Seed failed:", error);
	process.exit(1);
});
