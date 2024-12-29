import { ContactForm } from "@/components/contact-form";
import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="container flex flex-grow">
      <div className="w-full rounded-lg shadow-xl bg-border">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 px-16 py-16 mx-auto text-gray-900">
          <div className="flex flex-col h-full">
            <div>
              <h2 className="text-4xl lg:text-6xl text-pretty font-bold">
                Lets <span className="text-primary">chat</span> about everything!
              </h2>
              <div className="text-gray-700 mt-8">
                Hate forms? Send me an email instead{" "}
                <span className="underline">
                  <a href="mailto:propbono@gmail.com">propbono@gmail.com</a>
                </span>
              </div>
            </div>
            <div className="relative w-full flex-grow max-h-[400px] mt-4">
              <Image
                src="/images/The-whole-world.png"
                alt="World illustration"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-bottom"
                priority
              />
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
