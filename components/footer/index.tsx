import Link from "next/link";
import {
  RiGithubFill,
  RiMailSendFill,
  RiCopyrightLine,
  RiLinkedinFill,
} from "react-icons/ri";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground container flex flex-col items-center justify-between gap-4 py-8 font-medium md:flex-row">
      <span className="flex items-center align-middle text-muted gap-2">
        <RiCopyrightLine /> 2023-{currentYear} by Greg Mozer
      </span>
      <nav className="flex items-center align-middle gap-8">
        <Link
          title="Github"
          href="https://github.com/propbono/"
          className="text-muted hover:text-primary"
          target="_blank"
        >
          <RiGithubFill className="h-6 w-6" />
        </Link>
        <Link
          title="LinkedIn"
          href="https://www.linkedin.com/in/greg-mozer/"
          className="text-muted hover:text-primary"
          target="_blank"
        >
          <RiLinkedinFill className="h-6 w-6" />
        </Link>
        <Link
          href="mailto:propbono@gmail"
          className="text-muted hover:text-primary"
          target="_blank"
        >
          <RiMailSendFill className="h-6 w-6" />
        </Link>
      </nav>
    </footer>
  );
};
