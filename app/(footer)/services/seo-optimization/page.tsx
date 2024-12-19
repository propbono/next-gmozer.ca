import { BreadcrumbNav } from "@/components/breadcrumbs";

export default function SeoOptimization() {
  return (
    <div className="container">
      <BreadcrumbNav />
      <h1 className="text-4xl font-bold mb-6">SEO Optimization Services</h1>
      <div className="grid gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Comprehensive SEO Solutions</h2>
          <p className="text-muted-foreground">
            Data-driven SEO strategies to improve your online visibility and organic traffic. Our services include:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
            <li>Technical SEO audits</li>
            <li>On-page optimization</li>
            <li>Content strategy development</li>
            <li>Keyword research and analysis</li>
            <li>Performance monitoring and reporting</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
          <div className="grid gap-4">
            <div>
              <h3 className="text-xl font-medium">1. Site Analysis</h3>
              <p className="text-muted-foreground">Comprehensive website audit and competitor analysis.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">2. Strategy Development</h3>
              <p className="text-muted-foreground">Custom SEO strategy based on analysis findings.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">3. Implementation</h3>
              <p className="text-muted-foreground">Executing optimization strategies and content improvements.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">4. Monitoring & Adjustment</h3>
              <p className="text-muted-foreground">Continuous monitoring and strategy refinement based on results.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
