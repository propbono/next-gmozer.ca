import { constructMetadata } from "@/app/metadata";
import { ProjectShowcase } from "@/components/project-showcase";

export const metadata = constructMetadata({
	title: "Projects | Greg Mozer",
	description:
		"Explore my portfolio of web development projects using React, Next.js, and TypeScript",
});

export default function Work() {
	return <ProjectShowcase />;
}
