import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPayloadClient } from "@/lib/payload";
import enMessages from "../../messages/en.json" with { type: "json" };
import plMessages from "../../messages/pl.json" with { type: "json" };
import { createLocalized, runSeed } from "./seed-helpers";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const PROJECT_KEYS = [
	"project1",
	"project2",
	"project3",
	"project4",
	"project5",
	"project6",
] as const;

type ProjectKey = (typeof PROJECT_KEYS)[number];

type ProjectData = {
	title: string;
	category: string;
	description: string;
	liveLink?: string;
	githubLink: string;
	stack: string[];
	image?: string;
};

const getProjectData = (
	messages: typeof enMessages,
	key: ProjectKey,
): ProjectData => {
	const project =
		messages.work.projects[key as keyof typeof messages.work.projects];
	return {
		title: project.title,
		category: project.category,
		description: project.description,
		liveLink: "liveLink" in project ? (project.liveLink as string) : undefined,
		githubLink: project.githubLink,
		stack: project.stack as string[],
		image: "image" in project ? (project.image as string) : undefined,
	};
};

async function uploadImage(
	payload: Awaited<ReturnType<typeof getPayloadClient>>,
	imagePath: string,
	altText: string,
): Promise<number | null> {
	const publicDir = path.resolve(dirname, "../../public");
	const fullPath = path.join(publicDir, imagePath);

	if (!fs.existsSync(fullPath)) {
		// biome-ignore lint/suspicious/noConsole: CLI script
		console.warn(`  ⚠️  Image not found: ${fullPath}`);
		return null;
	}

	const buffer = fs.readFileSync(fullPath);
	const fileName = path.basename(fullPath);

	const media = await payload.create({
		collection: "media",
		data: { alt: altText },
		file: {
			data: buffer,
			mimetype: "image/avif",
			name: fileName,
			size: buffer.length,
		},
	});

	return media.id;
}

async function seed() {
	const payload = await getPayloadClient();

	// biome-ignore lint/suspicious/noConsole: CLI script
	console.log("🌱 Starting seed...");

	// Delete existing projects
	const existing = await payload.find({
		collection: "projects",
		limit: 100,
	});

	if (existing.docs.length > 0) {
		// biome-ignore lint/suspicious/noConsole: CLI script
		console.log(`🗑️  Deleting ${existing.docs.length} existing projects...`);
		for (const doc of existing.docs) {
			await payload.delete({
				collection: "projects",
				id: doc.id,
			});
		}
	}

	// Delete existing media
	const existingMedia = await payload.find({
		collection: "media",
		limit: 100,
	});

	if (existingMedia.docs.length > 0) {
		// biome-ignore lint/suspicious/noConsole: CLI script
		console.log(`🗑️  Deleting ${existingMedia.docs.length} existing media...`);
		for (const doc of existingMedia.docs) {
			await payload.delete({
				collection: "media",
				id: doc.id,
			});
		}
	}

	// Create projects with English content, then update with Polish
	for (let i = 0; i < PROJECT_KEYS.length; i++) {
		const key = PROJECT_KEYS[i];
		const enData = getProjectData(enMessages, key);
		const plData = getProjectData(plMessages, key);

		// biome-ignore lint/suspicious/noConsole: CLI script
		console.log(`📝 Creating project: ${enData.title}`);

		// Upload image if available
		let imageId: number | null = null;
		if (enData.image) {
			// biome-ignore lint/suspicious/noConsole: CLI script
			console.log(`  📷 Uploading image: ${enData.image}`);
			imageId = await uploadImage(payload, enData.image, enData.title);
		}

		const created = await createLocalized(
			"projects",
			{
				title: enData.title,
				category: enData.category,
				description: enData.description,
				liveLink: enData.liveLink ?? null,
				githubLink: enData.githubLink,
				stack: enData.stack.map((name) => ({ name })),
				order: i + 1,
				...(imageId ? { image: imageId } : {}),
			},
			{
				title: plData.title,
				category: plData.category,
				description: plData.description,
			},
		);

		// biome-ignore lint/suspicious/noConsole: CLI script
		console.log(`  ✅ Created (id: ${created.id}) with EN + PL content`);
	}

	// biome-ignore lint/suspicious/noConsole: CLI script
	console.log(
		"\n🎉 Seed complete! Created 6 projects with EN/PL translations and images.",
	);
}

runSeed(seed);
