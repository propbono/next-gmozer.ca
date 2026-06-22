import { getPayloadClient } from "@/lib/payload";
import type { Config } from "@/payload-types";

type CollectionSlug = keyof Config["collections"] & string;
type LocalizedFields = Record<string, unknown>;

/**
 * Creates a document in the default locale (en) then updates it with Polish
 * translations. Shared across all collection seeds.
 */
export async function createLocalized(
	collection: CollectionSlug,
	enData: LocalizedFields,
	plData: LocalizedFields,
) {
	const payload = await getPayloadClient();

	const doc = await payload.create({
		collection,
		locale: "en",
		data: enData,
	});

	await payload.update({
		collection,
		id: doc.id,
		locale: "pl",
		data: plData,
	});

	return doc;
}

/**
 * Standard seed bootstrap — logs and handles errors uniformly.
 */
export async function runSeed(seedFn: () => Promise<void>) {
	try {
		await seedFn();
		process.exit(0);
	} catch (error) {
		// biome-ignore lint/suspicious/noConsole: CLI script
		console.error("❌ Seed failed:", error);
		process.exit(1);
	}
}
