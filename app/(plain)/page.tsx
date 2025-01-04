import { HeroPhoto } from "@/components/hero-photo";
import { Socials } from "@/components/socials";
import { Stats } from "@/components/stats";
import { Button } from "@/components/ui/button";
import { DEV_START_YEAR, RESUME_LINK, TECHNOLOGIES_MASTERED } from "@/constants/main";
import { SOCIALS } from "@/constants/socials";
import { getGithubStats, MOCK_STATS } from "@/services/github";
import { Stat } from "@/types/stats";
import { differenceInCalendarYears } from "date-fns";
import Link from "next/link";
import { RxDownload } from "react-icons/rx";
import { constructMetadata } from "../metadata";

const PROPRIETARY_PROJECTS_COUNT = 10;
const PROPRIETARY_COMMITS_COUNT = 550;

export const metadata = constructMetadata({
  title: "Greg Mozer | Senior Fullstack Engineer",
  description: "Building high-performance web applications with modern technologies",
});

export default async function Home() {
  const yearsOfExperience = differenceInCalendarYears(new Date(), DEV_START_YEAR);

  const githubStats = await getGithubStats();

  const stats: Stat[] = [
    {
      title: "Years of Experience",
      value: yearsOfExperience,
    },
    {
      title: "Projects Completed",
      value: githubStats.status === "success"
        ? PROPRIETARY_PROJECTS_COUNT + githubStats.data.projectCount
        : PROPRIETARY_PROJECTS_COUNT + MOCK_STATS.projectCount,
    },
    {
      title: "Technologies Mastered",
      value: TECHNOLOGIES_MASTERED,
    },
    {
      title: "Code Commits",
      value: githubStats.status === "success"
        ? PROPRIETARY_COMMITS_COUNT + githubStats.data.allCommitsCount
        : PROPRIETARY_COMMITS_COUNT + MOCK_STATS.allCommitsCount,
    },
  ];

  return (
    <main className="flex flex-col min-h-screen justify-around gap-8 py-6 md:pt-24">
      <section className="container flex flex-col md:flex-row items-center md:justify-between gap-8">
        <div className="text-center md:text-left max-w-2xl order-2 md:order-none">
          <span className="text-xl mb-2 2xl:mb-4">Senior Software Developer</span>
          <h1 className="w-full mb-4 2xl:mb-6 font-logo text-4xl md:text-5xl font-bold leading-relaxed text-foreground">
            Making the Web a <span className="text-primary">More Beautiful Place</span>, One Site at a Time.
          </h1>
          <p className="font-body text-xl md:text-2xl font-medium leading-relaxed text-muted-foreground  md:leading-normal mb-5 2xl:mb-7">
            Full-stack developer turning ideas into innovative web apps with React. Check out my latest projects for examples of my expertise in web development
            and see how I can help bring your ideas to life.
          </p>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <Button
              asChild
              variant="outline"
              className="flex gap-2 items-center uppercase"
            >
              <Link href={RESUME_LINK} download={true} target="_blank">
                <span>Download resume</span>
                <RxDownload className="text-xl" />
              </Link>
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
      <section className="container">
        <Stats stats={stats} />
      </section>
    </main>
  );
}
