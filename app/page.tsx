import { HeroPhoto } from "@/components/hero-photo";
import { Socials } from "@/components/socials";
import { Stats } from "@/components/stats";
import { Button } from "@/components/ui/button";
import { SOCIALS } from "@/constants/socials";
import { Stat } from "@/types/stats";
import { differenceInCalendarYears } from "date-fns";
import { Octokit } from "octokit";
import { RxDownload } from "react-icons/rx";

const DEV_START_YEAR = new Date("2018-12-10");
const TECHNOLOGIES_MASTERED = 10;

export default async function Home() {
  const yearsofExperience = differenceInCalendarYears(new Date(), DEV_START_YEAR);
  const { projectCount, allCommitsCount } = await getGithubStats();

  const projectsCompleted = 10 + projectCount;
  const codeCommits = 550 + allCommitsCount;

  const STATS: Stat[] = [
    {
      title: "Years of Experience",
      value: yearsofExperience,
    },
    {
      title: "Projects Completed",
      value: projectsCompleted,
    },
    {
      title: "Technologies Mastered",
      value: TECHNOLOGIES_MASTERED,
    },
    {
      title: "Code Commits",
      value: codeCommits,
    },
  ];

  return (
    <main className="flex flex-col min-h-full gap-8 py-6 md:py-24">
      <section className="container flex flex-col md:flex-row items-center md:justify-between gap-8">
        <div className="text-center md:text-left max-w-2xl order-2 md:order-none">
          <span className="text-xl mb-2">Senior Sofwtare Developer</span>
          <h1 className="w-full mb-4 font-logo text-4xl md:text-5xl font-bold leading-relaxed text-foreground">
            Making the Web a <span className="text-primary">More Beautiful Place</span>, One Site at a Time.
          </h1>
          <p className="font-body text-xl md:text-2xls font-medium leading-relaxed text-secondary-foreground  md:leading-normal mb-5">
            Full-stack developer turning ideas into innovative web apps with React. Check out my latest projects for examples of my expertise in web development
            and see how I can help bring your ideas to life.
          </p>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <Button
              variant="outline"
              className="flex gap-2 items-center uppercase"
            >
              <span>Download resume</span>
              <RxDownload className="text-xl" />
            </Button>
            <Socials
              links={SOCIALS}
              as="div"
              containerStyles="flex gap-6"
              iconStyles="size-9 border border-primary rounded-full flex justify-center items-center text-primary text-base hover:bg-primary hover:text-background hover:transition-all duration-500"
            />
          </div>
        </div>
        <div className="order-1 md:order-none mb-6 md:mb-0">
          <HeroPhoto />
        </div>
      </section>
      <section className="container flex flex-col md:flex-row gap-8 items-center justify-center">
        <Stats stats={STATS} />
      </section>
    </main>
  );
}
async function getGithubStats() {
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
