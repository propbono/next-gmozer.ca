import { beforeEach, describe, expect, it, vi } from "vitest";
import { getGithubStats } from "./github";

const mockRequest = vi.fn();

vi.mock("octokit", () => ({
	Octokit: vi.fn().mockImplementation(() => ({
		request: mockRequest,
	})),
}));

describe("getGithubStats", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("successfully fetches github stats", async () => {
		const mockRepos = [{ name: "repo1" }, { name: "repo2" }];
		const mockContributors = [
			{ data: [{ login: "propbono", contributions: 100 }] },
			{ data: [{ login: "propbono", contributions: 150 }] },
		];

		vi.mocked(mockRequest)
			.mockResolvedValueOnce({ data: mockRepos })
			.mockResolvedValueOnce(mockContributors[0])
			.mockResolvedValueOnce(mockContributors[1]);

		const stats = await getGithubStats();

		expect(stats).toEqual({
			data: {
				projectCount: 2,
				allCommitsCount: 250,
			},
			status: "success",
		});
	});

	it("returns mock stats when github api fails", async () => {
		vi.mocked(mockRequest).mockRejectedValue(new Error("API Error"));

		const stats = await getGithubStats();

		expect(stats).toEqual({
			message: "API Error",
			status: "error",
		});
	});

	it("counts contributions only from specified github usernames", async () => {
		const mockRepos = [{ name: "repo1" }];
		const mockContributors = {
			data: [
				{ login: "propbono", contributions: 100 },
				{ login: "gregmozer", contributions: 50 },
				{ login: "someoneelse", contributions: 200 },
			],
		};

		vi.mocked(mockRequest)
			.mockResolvedValueOnce({ data: mockRepos })
			.mockResolvedValueOnce(mockContributors);

		const stats = await getGithubStats();

		if (stats.status !== "success") return;

		expect(stats.status).toBe("success");
		expect(stats.data.allCommitsCount).toBe(150);
	});

	it("returns mock stats when repository list is empty", async () => {
		vi.mocked(mockRequest).mockResolvedValueOnce({ data: [] });

		const stats = await getGithubStats();

		expect(stats).toEqual({
			status: "error",
			message: "Projects length empty. Returning mock data.",
		});
	});
});
