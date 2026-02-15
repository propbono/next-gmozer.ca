import {
	SiApollographql,
	SiCss3,
	SiCypress,
	SiDocker,
	SiGit,
	SiGithubactions,
	SiHtml5,
	SiJavascript,
	SiJest,
	SiJira,
	SiMaterialdesign,
	SiMongodb,
	SiNextdotjs,
	SiNodedotjs,
	SiNx,
	SiPostgresql,
	SiPrisma,
	SiPuppeteer,
	SiPython,
	SiReact,
	SiReactquery,
	SiReactrouter,
	SiRedux,
	SiRemix,
	SiTailwindcss,
	SiTurborepo,
	SiTypescript,
	SiVercel,
	SiVite,
	SiVitest,
	SiWebpack,
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";

export type SkillCategoryId =
	| "frontend"
	| "backend"
	| "languages"
	| "tools"
	| "testing";

export type SkillCategory = {
	id: SkillCategoryId;
	title: string;
	items: {
		name: string;
		link: string;
		icon: React.ReactNode;
	}[];
};

export const SKILLS: SkillCategory[] = [
	{
		id: "frontend",
		title: "Frontend",
		items: [
			{ link: "https://react.dev/", name: "React", icon: <SiReact /> },
			{ link: "https://nextjs.org/", name: "NextJS", icon: <SiNextdotjs /> },
			{ link: "https://remix.run/", name: "RemixJS", icon: <SiRemix /> },
			{
				link: "https://html.spec.whatwg.org/",
				name: "HTML 5",
				icon: <SiHtml5 />,
			},
			{
				link: "https://www.w3.org/Style/CSS/",
				name: "CSS 3",
				icon: <SiCss3 />,
			},
			{
				link: "https://tailwindcss.com/",
				name: "Tailwind CSS",
				icon: <SiTailwindcss />,
			},
			{
				link: "https://mui.com/",
				name: "Material UI",
				icon: <SiMaterialdesign />,
			},
			{
				link: "https://tanstack.com/query/latest",
				name: "React Query",
				icon: <SiReactquery />,
			},
			{
				link: "https://reactrouter.com/",
				name: "React Router",
				icon: <SiReactrouter />,
			},
			{ link: "https://redux.js.org/", name: "Redux", icon: <SiRedux /> },
			{
				link: "https://www.apollographql.com/",
				name: "Apollo Client",
				icon: <SiApollographql />,
			},
			{
				link: "https://tanstack.com/router",
				name: "TanStack Router",
				icon: <SiReactrouter />,
			},
		],
	},
	{
		id: "backend",
		title: "Backend",
		items: [
			{ link: "https://nodejs.org/", name: "Node.js", icon: <SiNodedotjs /> },
			{
				link: "https://www.mongodb.com/",
				name: "MongoDB",
				icon: <SiMongodb />,
			},
			{
				link: "https://www.postgresql.org/",
				name: "PostgreSQL",
				icon: <SiPostgresql />,
			},
			{ link: "https://www.prisma.io/", name: "Prisma", icon: <SiPrisma /> },
		],
	},
	{
		id: "languages",
		title: "Languages",
		items: [
			{
				link: "https://www.typescriptlang.org/",
				name: "TypeScript",
				icon: <SiTypescript />,
			},
			{
				link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
				name: "JavaScript",
				icon: <SiJavascript />,
			},
			{ link: "https://www.python.org/", name: "Python", icon: <SiPython /> },
		],
	},
	{
		id: "tools",
		title: "Tools & DevOps",
		items: [
			{ link: "https://git-scm.com/", name: "Git", icon: <SiGit /> },
			{
				link: "https://github.com/features/actions",
				name: "GitHub Actions",
				icon: <SiGithubactions />,
			},
			{ link: "https://www.docker.com/", name: "Docker", icon: <SiDocker /> },
			{ link: "https://nx.dev/", name: "NX Monorepo", icon: <SiNx /> },
			{ link: "https://vercel.com/", name: "Vercel", icon: <SiVercel /> },
			{ link: "https://vitejs.dev/", name: "Vite", icon: <SiVite /> },
			{ link: "https://webpack.js.org/", name: "Webpack", icon: <SiWebpack /> },
			{
				link: "https://www.atlassian.com/software/jira",
				name: "Jira",
				icon: <SiJira />,
			},
			{
				link: "https://turbo.build/",
				name: "Turborepo",
				icon: <SiTurborepo />,
			},
			{
				link: "https://azure.microsoft.com/",
				name: "Azure",
				icon: <VscAzure />,
			},
		],
	},
	{
		id: "testing",
		title: "Testing",
		items: [
			{ link: "https://jestjs.io/", name: "Jest", icon: <SiJest /> },
			{ link: "https://vitest.dev/", name: "Vitest", icon: <SiVitest /> },
			{ link: "https://www.cypress.io/", name: "Cypress", icon: <SiCypress /> },
			{
				link: "https://playwright.dev/",
				name: "Playwright",
				icon: <SiPuppeteer />,
			},
		],
	},
];
