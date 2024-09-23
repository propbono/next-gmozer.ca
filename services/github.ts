import { Octokit } from "octokit";

export async function getGithubStats() {
  const ocktokit = new Octokit({
    auth: process.env.GITHUB_TOKEN,
  });

  const response = await ocktokit.request("GET /user/repos", {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  const projects = response.data;

  const requests = projects.map((rep: any) =>
    ocktokit.request("GET /repos/{owner}/{repo}/contributors", {
      owner: "propbono",
      repo: rep.name,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })
  );

  const allCommitsCount = (await Promise.all(requests)).flatMap(response => response.data).filter(user =>
    user.login === "propbono" || user.login === "gregmozer"
  )
    .reduce(
      (acc, curr) => acc + curr.contributions,
      0,
    );

  return { projectCount: projects.length || 20, allCommitsCount: allCommitsCount || 2000 };
}
