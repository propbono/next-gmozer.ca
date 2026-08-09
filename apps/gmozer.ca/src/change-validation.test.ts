import { describe, expect, it } from "vitest";
import { PROJECT_KEYS } from "@/constants/main";
import en from "../messages/en.json";
import pl from "../messages/pl.json";

describe("Farah Freight Group link fix", () => {
	it("uses the Vercel deployment URL in English locale", () => {
		const project = en.work.projects.project1;
		expect(project.liveLink).toBe("https://prod-farahfg.vercel.app/");
	});

	it("uses the Vercel deployment URL in Polish locale", () => {
		const project = pl.work.projects.project1;
		expect(project.liveLink).toBe("https://prod-farahfg.vercel.app/");
	});

	it("does not reference the broken farahfg.com domain", () => {
		const allLinks = Object.values(en.work.projects).map((p) => p.liveLink);
		expect(allLinks).not.toContain("https://farahfg.com/");
	});
});

describe("New portfolio projects", () => {
	const newKeys = ["project7", "project8", "project9"] as const;
	const expectedProjects = {
		project7: {
			titleEn: "Gabeyre Global Inc",
			titlePl: "Gabeyre Global Inc",
			image: "/work/gabeyreglobal.avif",
			liveLink: "https://gabeyreglobal.com/",
			githubLink: "https://github.com/propbono/gabeyreglobal.ca",
		},
		project8: {
			titleEn: "Dev Slot",
			titlePl: "Dev Slot",
			image: "/work/dev-slot.avif",
			liveLink: "https://dev-slot.vercel.app/",
			githubLink: "https://github.com/propbono/dev-slot",
		},
		project9: {
			titleEn: "Vault Onboarding",
			titlePl: "Vault Onboarding",
			image: "/work/vault-onboarding.avif",
			liveLink: "https://vault-onboarding-self.vercel.app/",
			githubLink: "https://github.com/propbono/vault-onboarding",
		},
	};

	for (const key of newKeys) {
		const expected = expectedProjects[key];

		it(`${key} exists in English locale with correct data`, () => {
			const project = en.work.projects[key as keyof typeof en.work.projects];
			expect(project).toBeDefined();
			expect(project.title).toBe(expected.titleEn);
			expect(project.image).toBe(expected.image);
			expect(project.liveLink).toBe(expected.liveLink);
			expect(project.githubLink).toBe(expected.githubLink);
			expect(project.category).toBeTruthy();
			expect(project.description).toBeTruthy();
			expect(project.stack).toBeInstanceOf(Array);
		});

		it(`${key} exists in Polish locale with correct data`, () => {
			const project = pl.work.projects[key as keyof typeof pl.work.projects];
			expect(project).toBeDefined();
			expect(project.title).toBe(expected.titlePl);
			expect(project.image).toBe(expected.image);
			expect(project.liveLink).toBe(expected.liveLink);
			expect(project.githubLink).toBe(expected.githubLink);
			expect(project.category).toBeTruthy();
			expect(project.description).toBeTruthy();
			expect(project.stack).toBeInstanceOf(Array);
		});
	}
});

describe("PROJECT_KEYS constant", () => {
	it("includes all 9 project keys", () => {
		expect(PROJECT_KEYS).toEqual([
			"project1",
			"project2",
			"project3",
			"project4",
			"project5",
			"project6",
			"project7",
			"project8",
			"project9",
		]);
	});

	it("has matching keys in English locale", () => {
		const localeKeys = Object.keys(en.work.projects);
		for (const key of PROJECT_KEYS) {
			expect(localeKeys).toContain(key);
		}
	});

	it("has matching keys in Polish locale", () => {
		const localeKeys = Object.keys(pl.work.projects);
		for (const key of PROJECT_KEYS) {
			expect(localeKeys).toContain(key);
		}
	});
});
