import { BreadcrumbNav } from "@/components/breadcrumbs";

export default function WebDevelopment() {
  return (
    <div className="container">
      <BreadcrumbNav />
      <h1 className="text-4xl font-bold mb-6">Web Development Services</h1>
      <div className="grid gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
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

        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Process</h2>
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

        <section>
          <h2 className="text-2xl font-semibold mb-4">Technologies We Use</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>React, Next.js, TypeScript</li>
            <li>Node.js, Express</li>
            <li>PostgreSQL, MongoDB</li>
            <li>AWS, Vercel, Docker</li>
            <li>Git, GitHub Actions</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
