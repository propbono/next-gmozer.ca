import { SOCIALS } from "@/constants/socials";
import { RiCopyrightLine } from "react-icons/ri";
import { Socials } from "../socials";

export const Footer = () => {
  return (
    <footer className="bg-foreground py-8">
      <div className="font-medium container flex flex-col items-center justify-between gap-4  md:flex-row">
        <span className="flex items-center align-middle text-muted gap-2">
          <RiCopyrightLine /> 2023 Greg Mozer | All rights reserved
        </span>
        <Socials
          links={SOCIALS}
          containerStyles="flex items-center align-middle gap-8"
          iconStyles="text-2xl text-muted hover:text-primary hover:transition-all duration-500"
        />
      </div>
    </footer>
  );
};
