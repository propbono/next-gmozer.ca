import { ContactForm } from "@/components/contact-form";

export default function ContactPage() {
  return (
    <div className="container flex flex-grow">
      <div className="w-full rounded-lg shadow-xl bg-border">
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 px-16 py-16 mx-auto text-gray-900">
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">Lets talk about everything!</h2>
              <div className="text-gray-700 mt-8">
                Hate forms? Send us an email instead{" "}
                <span className="underline">
                  <a href="mailto:propbono@gmail.com">propbono@gmail.com</a>
                </span>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
