import { constructMetadata } from "@/app/metadata";
import { BreadcrumbNav } from "@/components/breadcrumbs";

export const metadata = constructMetadata({
  title: "Web Development Services | Greg Mozer",
  description: "Building high-performance, scalable web applications with modern frameworks and best practices in mind.",
});

export default function WebDevelopment() {
  return (
    <article className="container">
      <BreadcrumbNav />
      <header>
        <h1 className="text-4xl font-bold mb-6">Web Development Services</h1>
      </header>
      <div className="grid gap-8">
        <section aria-labelledby="offerings">
          <h2 id="offerings" className="text-2xl font-semibold mb-4">What We Offer</h2>
          <p className="text-muted-foreground">
            Comprehensive web development solutions using cutting-edge technologies and frameworks. We specialize in building:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
            <li>Single Page Applications (SPA) using React and Next.js</li>
            <li>Full-stack web applications with robust backend integration</li>
            <li>Progressive Web Apps (PWA) for enhanced mobile experience</li>
            <li>Custom API development and integration</li>
            <li>Database design and optimization</li>
          </ul>
        </section>

        <section aria-labelledby="process">
          <h2 id="process" className="text-2xl font-semibold mb-4">Our Process</h2>
          <div className="grid gap-4">
            <div>
              <h3 className="text-xl font-medium">1. Planning & Architecture</h3>
              <p className="text-muted-foreground">Technical requirements gathering, system architecture design, and project roadmap creation.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">2. Development</h3>
              <p className="text-muted-foreground">Agile development process with regular updates and continuous integration.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">3. Testing & QA</h3>
              <p className="text-muted-foreground">Comprehensive testing including unit tests, integration tests, and user acceptance testing.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">4. Deployment & Maintenance</h3>
              <p className="text-muted-foreground">Smooth deployment process and ongoing maintenance support.</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="technologies">
          <h2 id="technologies" className="text-2xl font-semibold mb-4">Technologies We Use</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>React, Next.js, TypeScript</li>
            <li>Node.js, Express</li>
            <li>PostgreSQL, MongoDB</li>
            <li>AWS, Vercel, Docker</li>
            <li>Git, GitHub Actions</li>
          </ul>
        </section>
      </div>
    </article>
  );
}
