import { ABOUT } from "@/constants/resume";

export default function About() {
  return (
    <div className="flex flex-col gap-8 text-center md:text-left">
      <h2 className="font-bold text-4xl">{ABOUT.title}</h2>
      <p className="max-w-3xl mx-auto leading-relaxed md:mx-0 text-muted-foreground">{ABOUT.description}</p>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto md:mx-0">
        {ABOUT.items.map((item, index) => (
          <li key={index} className="flex gap-4 justify-center md:justify-start items-center">
            <span className="font-semibold">
              {item.name}
            </span>
            <span className="font-bold text-muted-foreground text-xl">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
