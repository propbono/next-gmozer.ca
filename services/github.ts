import { Octokit } from "octokit";

type GithubStats = {
  projectCount: number;
  allCommitsCount: number;
};

const MOCK_STATS: GithubStats = {
  projectCount: 20,
  allCommitsCount: 2000,
};

const GITHUB_USERNAMES = ["propbono", "gregmozer"] as const;

export async function getGithubStats(): Promise<GithubStats> {
  try {
    const ocktokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    const response = await ocktokit.request("GET /user/repos", {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    const projects = response.data;

    if (projects.length === 0) {
      return MOCK_STATS;
    }

    const requests = projects.map((repo) =>
      ocktokit.request("GET /repos/{owner}/{repo}/contributors", {
        owner: "propbono",
        repo: repo.name,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      })
    );

    const contributionsData = await Promise.all(requests);
    const allCommitsCount = contributionsData
      .flatMap((response) => response.data)
      .filter((user) => GITHUB_USERNAMES.includes(user.login as typeof GITHUB_USERNAMES[number]))
      .reduce((acc, curr) => acc + curr.contributions, 0);

    return {
      projectCount: projects.length,
      allCommitsCount,
    };
  } catch (error) {
    console.error("Failed to fetch GitHub stats:", error);
    return MOCK_STATS;
  }
}
