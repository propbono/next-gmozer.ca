import { constructMetadata } from "@/app/metadata";
import { BreadcrumbNav } from "@/components/breadcrumbs";

export const metadata = constructMetadata({
	title: "Logo Design Services | Greg Mozer",
	description:
		"Creating distinctive and memorable brand identities that resonate with target audiences and stand the test of time.",
});

export default function LogoDesign() {
	return (
		<article className="container">
			<BreadcrumbNav />
			<header>
				<h1 className="text-4xl font-bold mb-6">Logo Design Services</h1>
			</header>
			<div className="grid gap-8">
				<section aria-labelledby="brand-identity">
					<h2 id="brand-identity" className="text-2xl font-semibold mb-4">
						Brand Identity Creation
					</h2>
					<p className="text-muted-foreground">
						Creating distinctive visual identities that capture your
						brand&apos;s essence. Our logo design includes:
					</p>
					<ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
						<li>Custom vector graphics</li>
						<li>Color palette selection</li>
						<li>Typography recommendations</li>
						<li>Multiple format deliverables</li>
						<li>Brand guidelines documentation</li>
					</ul>
				</section>

				<section aria-labelledby="process">
					<h2 id="process" className="text-2xl font-semibold mb-4">
						Design Process
					</h2>
					<div className="grid gap-4">
						<div>
							<h3 className="text-xl font-medium">1. Brand Discovery</h3>
							<p className="text-muted-foreground">
								Understanding your brand values, target audience, and market
								positioning.
							</p>
						</div>
						<div>
							<h3 className="text-xl font-medium">2. Concept Development</h3>
							<p className="text-muted-foreground">
								Creating multiple design concepts based on research findings.
							</p>
						</div>
						<div>
							<h3 className="text-xl font-medium">3. Refinement</h3>
							<p className="text-muted-foreground">
								Iterative refinement process with client feedback.
							</p>
						</div>
						<div>
							<h3 className="text-xl font-medium">4. Finalization</h3>
							<p className="text-muted-foreground">
								Delivery of final files in various formats for different use
								cases.
							</p>
						</div>
					</div>
				</section>
			</div>
		</article>
	);
}
