import { constructMetadata } from "@/app/metadata";
import { ContactForm } from "@/components/contact-form";
import Image from "next/image";

export const metadata = constructMetadata({
  title: "Contact | Greg Mozer",
  description: "Get in touch for web development projects, consultations, or collaborations. Let's build something great together.",
});

export default function ContactPage() {
  return (
    <article className="container flex flex-grow">
      <div className="w-full rounded-lg shadow-xl bg-border">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 px-16 py-16 mx-auto text-gray-900">
          <section className="flex flex-col h-full" aria-labelledby="contact-heading">
            <div>
              <h1 id="contact-heading" className="w-full mb-4 2xl:mb-6 font-logo text-4xl md:text-5xl font-bold leading-relaxed text-foreground">
                Lets <span className="text-primary">chat</span> about everything!
              </h1>
              <p className="text-gray-700 mt-8">
                Hate forms? Send me an email instead <a href="mailto:propbono@gmail.com" className="underline">propbono@gmail.com</a>
              </p>
            </div>
            <figure className="relative w-full flex-grow max-h-[400px] mt-4">
              <Image
                src="/images/The-whole-world.png"
                alt="World illustration"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-bottom"
                priority
              />
            </figure>
          </section>
          <section aria-label="Contact form">
            <ContactForm />
          </section>
        </div>
      </div>
    </article>
  );
}
