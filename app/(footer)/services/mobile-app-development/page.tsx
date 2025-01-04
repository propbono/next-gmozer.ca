import { constructMetadata } from "@/app/metadata";
import { BreadcrumbNav } from "@/components/breadcrumbs";

export const metadata = constructMetadata({
  title: "Mobile App Development Services | Greg Mozer",
  description: "Developing native and cross-platform mobile applications that provide seamless user experiences across all devices.",
});

export default function MobileAppDevelopment() {
  return (
    <div className="container">
      <BreadcrumbNav />
      <h1 className="text-4xl font-bold mb-6">Mobile App Development Services</h1>
      <div className="grid gap-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">Mobile Solutions</h2>
          <p className="text-muted-foreground">
            Creating powerful mobile applications for iOS and Android platforms. We specialize in:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
            <li>Native iOS and Android development</li>
            <li>Cross-platform development using React Native</li>
            <li>Progressive Web Apps (PWA)</li>
            <li>Mobile app testing and optimization</li>
            <li>App Store submission and optimization</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Development Process</h2>
          <div className="grid gap-4">
            <div>
              <h3 className="text-xl font-medium">1. Requirements Analysis</h3>
              <p className="text-muted-foreground">Understanding your app requirements and target audience.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">2. Design & Development</h3>
              <p className="text-muted-foreground">UI/UX design and iterative development process.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">3. Testing</h3>
              <p className="text-muted-foreground">Comprehensive testing across different devices and scenarios.</p>
            </div>
            <div>
              <h3 className="text-xl font-medium">4. Deployment & Support</h3>
              <p className="text-muted-foreground">App store submission and ongoing maintenance support.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
