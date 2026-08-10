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
		const allLinks = Object.values(en.work.projects).map(
			(p) => (p as { liveLink?: string }).liveLink,
		);
		expect(allLinks).not.toContain("https://farahfg.com/");
	});
});

describe("Reordered portfolio projects", () => {
	const projectChecks = {
		project3: {
			titleEn: "Gabeyre Global Inc",
			titlePl: "Gabeyre Global Inc",
			image: "/work/gabeyreglobal.avif",
			liveLink: "https://gabeyreglobal.com/",
			githubLink: "https://github.com/propbono/gabeyreglobal.ca",
		},
		project4: {
			titleEn: "Dev Slot",
			titlePl: "Dev Slot",
			image: "/work/dev-slot.avif",
			liveLink: "https://dev-slot.vercel.app/",
			githubLink: "https://github.com/propbono/dev-slot",
		},
		project7: {
			titleEn: "Vault Onboarding",
			titlePl: "Vault Onboarding",
			image: "/work/vault-onboarding.avif",
			liveLink: "https://vault-onboarding-self.vercel.app/",
			githubLink: "https://github.com/propbono/vault-onboarding",
		},
		project9: {
			titleEn: "PSL Group Quiz",
			titlePl: "PSL Group Quiz",
			image: "/work/psl-quiz.avif",
			liveLink: "https://psl-quiz.vercel.app/",
			githubLink: "https://github.com/propbono/PSLGroup-Test",
		},
	};

	for (const [key, expected] of Object.entries(projectChecks)) {
		it(`${key} exists in English locale with correct data`, () => {
			const project = en.work.projects[key as keyof typeof en.work.projects];
			expect(project).toBeDefined();
			expect(project.title).toBe(expected.titleEn);
			expect(project.image).toBe(expected.image);
			expect((project as { liveLink?: string }).liveLink).toBe(
				expected.liveLink,
			);
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
			expect((project as { liveLink?: string }).liveLink).toBe(
				expected.liveLink,
			);
			expect(project.githubLink).toBe(expected.githubLink);
			expect(project.category).toBeTruthy();
			expect(project.description).toBeTruthy();
			expect(project.stack).toBeInstanceOf(Array);
		});
	}

	it("project11 (Prime Sequence Filter) exists in both locales with no liveLink", () => {
		const enProj = en.work.projects.project11;
		const plProj = pl.work.projects.project11;
		expect(enProj).toBeDefined();
		expect(enProj.title).toBe("Prime Sequence Filter");
		expect((enProj as { liveLink?: string }).liveLink).toBeUndefined();
		expect(enProj.githubLink).toBe(
			"https://github.com/propbono/swm-interview-2024",
		);
		expect(plProj).toBeDefined();
		expect(plProj.title).toBe("Filtr Sekwencji Liczb Pierwszych");
		expect((plProj as { liveLink?: string }).liveLink).toBeUndefined();
	});
});

describe("PROJECT_KEYS constant", () => {
	it("includes all 11 project keys in order", () => {
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
			"project10",
			"project11",
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
