import { getPayloadClient } from "@/lib/payload";
import enMessages from "../../messages/en.json" with { type: "json" };
import plMessages from "../../messages/pl.json" with { type: "json" };
import { runSeed } from "./seed-helpers";

type AboutData = {
	title: string;
	description: string;
	name: string;
	phone: string;
	email: string;
	location: string;
	nationality: string;
	languages: { language: string }[];
};

const getAboutData = (messages: typeof enMessages): AboutData => {
	const about = messages.resume.about;
	const items = about.items;

	return {
		title: about.title,
		description: about.description,
		name: items.name.value,
		phone: items.phone.value,
		email: items.email.value,
		location: items.location.value,
		nationality: items.nationality.value,
		languages: items.languages.value
			.split(",")
			.map((l) => ({ language: l.trim() })),
	};
};

async function seed() {
	const payload = await getPayloadClient();

	// biome-ignore lint/suspicious/noConsole: CLI script
	console.log("🌱 Starting seed for About Me...");

	const enData = getAboutData(enMessages);
	const plData = getAboutData(plMessages);

	// biome-ignore lint/suspicious/noConsole: CLI script
	console.log("📝 Updating About Me (EN)...");
	await payload.updateGlobal({
		slug: "about-me",
		data: enData,
		locale: "en",
	});

	// biome-ignore lint/suspicious/noConsole: CLI script
	console.log("📝 Updating About Me (PL)...");
	await payload.updateGlobal({
		slug: "about-me",
		data: plData,
		locale: "pl",
	});

	// biome-ignore lint/suspicious/noConsole: CLI script
	console.log("\n🎉 Seed complete! Updated About Me with EN/PL translations.");
}

runSeed(seed);
