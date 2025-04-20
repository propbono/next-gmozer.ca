export interface Project {
	title: string;
	category: "Frontend" | "Fullstack" | "Algorithm";
	description: string;
	liveLink?: string;
	githubLink: string;
	stack: string[];
	image: string;
}

export const PROJECTS: Project[] = [
	{
		title: "Farah Freight Group",
		category: "Frontend",
		description:
			"Company website for Farah Freight Group. Single Page Application created using NextJS and Nodemailer for sending emails.",
		liveLink: "https://farahfg.com/",
		githubLink: "https://github.com/propbono/farahfg.com",
		stack: [
			"React",
			"Next.js",
			"TypeScript",
			"Tailwind CSS",
			"Nodemailer",
			"Vercel",
		],
		image: "/work/farah-freight.avif",
	},
	{
		title: "Gemprint",
		category: "Fullstack",
		description:
			"Company website for Gemprint. Single Page Application created using NextJS and NextAuth. Currently working on adding Dashboard to manage print orders.",
		liveLink: "https://gemprint.ca/",
		githubLink: "https://github.com/propbono/gemprint.ca",
		stack: [
			"Next.js",
			"TypeScript",
			"Tailwind CSS",
			"Prisma",
			"Vercel",
			"Resend",
		],
		image: "/work/gemprint.avif",
	},
	{
		title: "Greg Mozer / Propbono (New)",
		category: "Fullstack",
		description:
			"Propbono portfolio website presenting some of the projects that I worked on.",
		liveLink: "https://gmozer.ca/",
		githubLink: "https://github.com/propbono/next-gmozer.ca",
		stack: ["Next.js", "TypeScript", "Tailwind CSS", "FramerMotion", "Vercel"],
		image: "/work/gmozer-new.avif",
	},
	{
		title: "Wizzcode Music App",
		category: "Frontend",
		description:
			"Sample music app to test React Query hooks and write some cool tests in Vitest. It communicates with Itunes API and pull some albums using React Query.",
		liveLink: "https://wizcode-music.vercel.app/",
		githubLink: "https://github.com/propbono/wizcode-music",
		stack: ["React.js", "TypeScript", "Tailwind CSS", "Vite", "Vercel"],
		image: "/work/wizcode.avif",
	},
	{
		title: "Greg Mozer / Propbono (Old)",
		category: "Frontend",
		description:
			"Propbono portfolio website presenting some of the projects that I worked on. Written in RemixJS.",
		liveLink: "https://gmozerca-old.vercel.app/",
		githubLink: "https://github.com/propbono/portfolio",
		stack: ["Remix.js", "TypeScript", "Tailwind CSS", "Vite", "Vercel"],
		image: "/work/gmozer-old.avif",
	},
	{
		title: "SWM Interview 2024",
		category: "Algorithm",
		description:
			"Interview task is composed from two parts, coding exercise and an essay. Below you can see the information about programming task. Write a function that receives two sequences: A and B of integers and returns one sequence C. Sequence C should contain all elements from sequence A (maintaining the order) except those, that are present in sequence B p times, where p is a prime number.",
		githubLink: "https://github.com/propbono/swm-interview-2024",
		stack: ["TypeScript"],
		image: "/work/swm.avif",
	},
];
