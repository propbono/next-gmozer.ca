import { BreadcrumbNav } from "@/components/breadcrumbs";

export default function UiUxDesign() {
  return (
    <div className="container">
      <BreadcrumbNav />
      <h1 className="text-4xl font-bold mb-6">UI/UX Design Services</h1>
      <div className="grid gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Design Philosophy</h2>
          <p className="text-muted-foreground">
            Creating intuitive, user-centered designs that balance aesthetics with functionality. We focus on:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
            <li>User-centered design principles</li>
            <li>Accessibility standards (WCAG compliance)</li>
            <li>Responsive design for all devices</li>
            <li>Modern design trends and patterns</li>
            <li>Brand consistency</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Design Process</h2>
          <div className="grid gap-4">
            <div>
              <h3 className="text-xl font-medium">1. Research & Discovery</h3>
              <p className="text-muted-foreground">User research, competitor analysis, and requirement gathering.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">2. Wireframing</h3>
              <p className="text-muted-foreground">Low-fidelity designs and user flow mapping.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">3. Visual Design</h3>
              <p className="text-muted-foreground">High-fidelity designs with brand integration.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">4. Prototyping & Testing</h3>
              <p className="text-muted-foreground">Interactive prototypes and user testing.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Design Tools</h2>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground">
            <li>Figma for design and prototyping</li>
            <li>Adobe Creative Suite</li>
            <li>Sketch</li>
            <li>InVision</li>
            <li>Principle for animations</li>
          </ul>
        </section>
      </div>
    </div>
  );
}