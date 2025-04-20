import { Octokit } from "octokit";

const GITHUB_API_VERSION = "2022-11-28";
const DEFAULT_HEADERS = {
	"X-GitHub-Api-Version": GITHUB_API_VERSION,
};

type GithubStats = {
	projectCount: number;
	allCommitsCount: number;
};

export const MOCK_STATS: GithubStats = {
	projectCount: 20,
	allCommitsCount: 2000,
};

const GITHUB_USERNAMES = ["propbono", "gregmozer"] as const;

type GithubError = {
	status: "error";
	message: string;
};

type GithubSuccess = {
	status: "success";
	data: GithubStats;
};

type GithubResponse = GithubSuccess | GithubError;

export async function getGithubStats(): Promise<GithubResponse> {
	try {
		const ocktokit = new Octokit({
			auth: process.env.GITHUB_TOKEN,
			retry: {
				enabled: true,
				retries: 3,
			},
		});

		const response = await ocktokit.request("GET /user/repos", {
			headers: DEFAULT_HEADERS,
		});

		const projects = response.data;

		if (projects.length === 0) {
			throw new Error("Projects length empty. Returning mock data.");
		}

		const requests = projects.map((repo) =>
			ocktokit.request("GET /repos/{owner}/{repo}/contributors", {
				owner: "propbono",
				repo: repo.name,
				headers: {
					"X-GitHub-Api-Version": "2022-11-28",
				},
			}),
		);

		const contributionsData = await Promise.all(requests);
		const allCommitsCount = contributionsData
			.flatMap((response) => response.data)
			.filter((user) =>
				GITHUB_USERNAMES.includes(
					user.login as (typeof GITHUB_USERNAMES)[number],
				),
			)
			.reduce((acc, curr) => acc + curr.contributions, 0);

		return {
			status: "success",
			data: {
				projectCount: projects.length,
				allCommitsCount,
			},
		};
	} catch (error) {
		return {
			status: "error",
			message:
				error instanceof Error ? error.message : "Failed to fetch GitHub stats",
		};
	}
}
