import { TooltipProvider } from "@radix-ui/react-tooltip";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { phClientCapture } from "@/lib/posthog/client";
import { SocialLinks } from "./social-link";

// Mock the client capture function
vi.mock("@/lib/posthog/client", () => ({
	phClientCapture: vi.fn(),
}));

// Mock next-intl/navigation
vi.mock("@/i18n/navigation", () => ({
	Link: <T extends { children: React.ReactNode }>(props: T) => (
		<a {...props}>{props.children}</a>
	),
}));

describe("SocialLinks", () => {
	it("captures click_social_link event with correct typed properties", () => {
		render(
			<TooltipProvider>
				<SocialLinks />
			</TooltipProvider>,
		);

		// Find the LinkedIn link
		const link = screen.getByRole("link", { name: /linkedin/i });
		fireEvent.click(link);

		expect(phClientCapture).toHaveBeenCalledWith("click_social_link", {
			name: "Linkedin",
			url: expect.stringContaining("linkedin.com"),
		});
	});
});
