import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPayload } from "payload";
import enMessages from "../../messages/en.json" with { type: "json" };
import plMessages from "../../messages/pl.json" with { type: "json" };
import { SKILLS, type SkillCategoryId } from "../constants/resume";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Helper to extract icon name from React component
const getIconName = (icon: React.ReactNode): string => {
	if (
		icon &&
		typeof icon === "object" &&
		"type" in icon &&
		typeof icon.type === "function"
	) {
		return icon.type.name;
	}
	return "FaCode";
};

const getLocalizedCategoryTitle = (categoryId: SkillCategoryId) => {
	const enTitle = enMessages.resume.skills.categories[categoryId] || categoryId;
	const plTitle = plMessages.resume.skills.categories[categoryId] || categoryId;
	return { en: enTitle, pl: plTitle };
};

async function seed() {
	const configPath = path.resolve(dirname, "../payload.config.ts");

	// biome-ignore lint/suspicious/noExplicitAny: Payload config type is complex
	const configPromise = (await import(configPath)).default as any;
	const payload = await getPayload({
		config: configPromise,
	});

	// biome-ignore lint/suspicious/noConsole: CLI script
	console.log("🌱 Starting seed for Skill Categories...");

	try {
		// Clear existing categories
		const { docs: existingDocs } = await payload.find({
			collection: "skill-categories",
			limit: 100,
		});

		if (existingDocs.length > 0) {
			// biome-ignore lint/suspicious/noConsole: CLI script
			console.log(`🗑️  Deleting ${existingDocs.length} existing categories...`);
			for (const doc of existingDocs) {
				await payload.delete({
					collection: "skill-categories",
					id: doc.id,
				});
			}
		}

		let order = 1;
		for (const category of SKILLS) {
			const localizedTitles = getLocalizedCategoryTitle(category.id);
			// biome-ignore lint/suspicious/noConsole: CLI script
			console.log(
				`📝 Creating category: ${localizedTitles.en} / ${localizedTitles.pl}`,
			);

			// 1. Create with English (Default) locale
			const createdDoc = await payload.create({
				collection: "skill-categories",
				data: {
					title: localizedTitles.en,
					slug: category.id,
					order: order++,
					skills: category.items.map((skill) => {
						// biome-ignore lint/suspicious/noConsole: Debugging skill name
						console.log(`   - Adding skill: ${skill.name}`);
						return {
							name: skill.name,
							link: skill.link,
							iconName: getIconName(skill.icon),
						};
					}),
				},
				locale: "en",
			});

			// 2. Update with Polish locale
			// IMPORTANT: We must map the new data to the existing IDs generated in step 1
			// otherwise Payload might treat them as new rows or fail to update the localized fields correctly
			// if the array itself is not localized.
			if (createdDoc.skills) {
				await payload.update({
					collection: "skill-categories",
					id: createdDoc.id,
					data: {
						title: localizedTitles.pl,
						skills: createdDoc.skills.map((existingSkill, index) => {
							const sourceSkill = category.items[index];
							return {
								id: existingSkill.id, // Preserve the ID!
								name: sourceSkill.name, // Localized name (same for now)
								link: sourceSkill.link,
								iconName: getIconName(sourceSkill.icon),
							};
						}),
					},
					locale: "pl",
				});
			}
		}

		// biome-ignore lint/suspicious/noConsole: CLI script
		console.log("\n🎉 Seed complete! Populated Skill Categories.");
		process.exit(0);
	} catch (error) {
		// biome-ignore lint/suspicious/noConsole: CLI script
		console.error("❌ Seed failed during execution:", error);
		process.exit(1);
	}
}

seed().catch((error) => {
	// biome-ignore lint/suspicious/noConsole: CLI script
	console.error("❌ Seed failed initialization:", error);
	process.exit(1);
});
