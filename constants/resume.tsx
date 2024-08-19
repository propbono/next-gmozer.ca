import {
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
  SiPython,
  SiReact,
  SiReactquery,
  SiReactrouter,
  SiRedux,
  SiRemix,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVitest,
  SiWebpack,
} from "react-icons/si";

export const TABS = [
  {
    label: "Experience",
    url: "/resume",
  },
  {
    label: "Skills",
    url: "/resume/skills",
  },
  {
    label: "Education",
    url: "/resume/education",
  },
  {
    label: "About",
    url: "/resume/about",
  },
];

export const ABOUT = {
  title: "About me",
  descritpion:
    "I'm a full stack developer with a passion for learning and problem solving. I'm currently working as a software developer at a small start up in the Silicon Valley. I'm looking for a full time opportunity to expand my knowledge and skills and grow as a developer.",
  info: [
    { name: "Name", value: "Greg Mozer" },
    { name: "Phone", value: "+1 (647) 833 8068" },
    { name: "Email", value: "propbono@gmail.com" },
    { name: "Location", value: "Toronto, ON, Canada" },
    { name: "Nationality", value: "Canadian, Polish" },
    { name: "Languages", value: "English, Polish" },
  ],
};

export const EXPERIENCE = {
  icon: "/assets/resume/badge.svg",
  title: "Experience",
  description: "I've had the pleasure of working with a few companies over the years.",
  items: [
    {
      position: "Senior Software Developer",
      company: "Rangle.io",
      location: "Toronto, ON, Canada",
      duration: "Nov 2023 - Present",
    },
    {
      position: "Senior Software Developer",
      company: "CGI (TSX: GIB.A)",
      location: "Toronto, ON, Canada",
      duration: "Jan 2023 - Nov 2023",
    },
    {
      position: "Software Developer",
      company: "CGI (TSX: GIB.A)",
      location: "Toronto, ON, Canada",
      duration: "Aug 2021 - Jan 2023",
    },
    {
      position: "Software Developer, Frontend",
      company: "DCM (TSX: DCM)",
      location: "Mississauga, ON, Canada",
      duration: "Jan 2021 - Aug 2021",
    },
    {
      position: "Software Developer, Quadient",
      company: "DCM (TSX: DCM)",
      location: "Mississauga, ON, Canada",
      duration: "Dec 2018 - Jan 2021",
    },
    {
      position: "Prepress Supervisor",
      company: "Printer Gateway Inc.",
      location: "Toronto, ON, Canada",
      duration: "Mar 2017 - Mar 2018",
    },
  ],
};

export const EDUCATION = {
  icon: "/assets/resume/cap.svg",
  title: "Education",
  description: "My education and certifications.",
  items: [
    {
      institution: "AWS",
      degree: "AWS Certified Cloud Practitioner",
      program: "",
      duration: "Nov 2023 - Present",
    },
    {
      institution: "WIT Academy, Warsaw, Poland",
      degree: "N/A",
      program: "Computer Science",
      duration: "2008-2010",
    },
    {
      institution: "Uczelnia Warszawska, Warsaw, Poland",
      program: "Computer Science and Econometrics",
      degree: "Bachelor of Engineering",
      duration: "2004 - 2008",
    },
  ],
};

export const SKILLS = {
  title: "Skills",
  icon: "/assets/resume/skills.svg",
  description: "I've worked with a variety of technologies and frameworks over the years.",
  items: [
    { link: "https://react.dev/", name: "React", icon: <SiReact /> },
    { link: "https://nextjs.org/", name: "NextJS", icon: <SiNextdotjs /> },
    { link: "https://remix.run/", name: "RemixJS", icon: <SiRemix /> },
    { link: "https://www.typescriptlang.org/", name: "TypeScript", icon: <SiTypescript /> },
    { link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", name: "JavaScript", icon: <SiJavascript /> },
    { link: "https://nodejs.org/", name: "Node.js", icon: <SiNodedotjs /> },
    { link: "https://html.spec.whatwg.org/", name: "HTML 5", icon: <SiHtml5 /> },
    { link: "https://www.w3.org/Style/CSS/", name: "CSS 3", icon: <SiCss3 /> },
    { link: "https://tailwindcss.com/", name: "Tailwind CSS", icon: <SiTailwindcss /> },
    { link: "https://mui.com/", name: "Material UI", icon: <SiMaterialdesign /> },
    { link: "https://git-scm.com/", name: "Git", icon: <SiGit /> },
    { link: "https://github.com/features/actions", name: "GitHub Actions", icon: <SiGithubactions /> },
    { link: "https://jestjs.io/", name: "Jest", icon: <SiJest /> },
    { link: "https://vitest.dev/", name: "Vitest", icon: <SiVitest /> },
    { link: "https://www.cypress.io/", name: "Cypress", icon: <SiCypress /> },
    { link: "https://vitejs.dev/", name: "Vite", icon: <SiVite /> },
    { link: "https://vercel.com/", name: "Vercel", icon: <SiVercel /> },
    { link: "https://webpack.js.org/", name: "Webpack", icon: <SiWebpack /> },
    { link: "https://nx.dev/", name: "NX Monorepo", icon: <SiNx /> },
    { link: "https://www.mongodb.com/", name: "MongoDB", icon: <SiMongodb /> },
    { link: "https://www.postgresql.org/", name: "PostgreSQL", icon: <SiPostgresql /> },
    { link: "https://www.prisma.io/", name: "Prisma", icon: <SiPrisma /> },
    { link: "https://redux.js.org/", name: "Redux", icon: <SiRedux /> },
    { link: "https://tanstack.com/query/latest", name: "React Query", icon: <SiReactquery /> },
    { link: "https://reactrouter.com/", name: "React Router", icon: <SiReactrouter /> },
    { link: "https://www.atlassian.com/software/jira", name: "Jira", icon: <SiJira /> },
    { link: "https://www.python.org/", name: "Python", icon: <SiPython /> },
    { link: "https://www.docker.com/", name: "Docker", icon: <SiDocker /> },
  ],
};
