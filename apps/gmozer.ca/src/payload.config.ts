import path from "node:path";
import { fileURLToPath } from "node:url";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { resendAdapter } from "@payloadcms/email-resend";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import sharp from "sharp";
import { Education } from "./collections/Education";
import { Experiences } from "./collections/Experiences";
import { Media } from "./collections/Media";
import { Projects } from "./collections/Projects";
import { Users } from "./collections/Users";
import { AboutMe } from "./globals/AboutMe";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	localization: {
		locales: [
			{ label: "English", code: "en" },
			{ label: "Polish", code: "pl" },
		],
		defaultLocale: "en",
		fallback: true,
	},
	admin: {
		user: "users",
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	collections: [Users, Media, Projects, Experiences, Education],
	globals: [AboutMe],
	editor: lexicalEditor(),
	secret: process.env.PAYLOAD_SECRET || "",
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: sqliteAdapter({
		client: {
			url: process.env.GMOZER_STORAGE_TURSO_DATABASE_URL || "file:./payload.db",
			authToken: process.env.GMOZER_STORAGE_TURSO_AUTH_TOKEN,
		},
	}),
	plugins: [
		...(process.env.GMOZER_READ_WRITE_TOKEN
			? [
					vercelBlobStorage({
						collections: {
							media: true,
						},
						token: process.env.GMOZER_READ_WRITE_TOKEN,
					}),
				]
			: []),
	],
	email: resendAdapter({
		defaultFromAddress: process.env.EMAIL_FROM || "noreply@gmozer.ca",
		defaultFromName: "gmozer.ca CMS",
		apiKey: process.env.RESEND_API_KEY || "",
	}),
	sharp,
});
