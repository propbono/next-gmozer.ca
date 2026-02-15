import { fireEvent, render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";
import { phClientCapture } from "@/lib/posthog/client";
import { DownloadResume } from "./resume-download";

// Mock the client capture function
vi.mock("@/lib/posthog/client", () => ({
	phClientCapture: vi.fn(),
}));

vi.mock("next-intl", () => ({
	useLocale: () => "en",
}));

// Mock dependencies
vi.mock("@/i18n/navigation", () => ({
	Link: <T extends { children: React.ReactNode }>(props: T) => (
		<a {...props}>{props.children}</a>
	),
}));
vi.mock("react-icons/rx", () => ({
	RxDownload: () => <span data-testid="icon">Download</span>,
}));
vi.mock("./ui/button", () => ({
	Button: ({
		children,
		asChild,
		...props
	}: ComponentProps<"button"> & { asChild?: boolean }) => {
		return <button {...props}>{children}</button>;
	},
}));

describe("DownloadResume", () => {
	it("captures download_resume event with properties", () => {
		render(<DownloadResume text="Resume" />);

		const link = screen.getByRole("link", { name: /resume/i });
		fireEvent.click(link);

		expect(phClientCapture).toHaveBeenCalledWith("download_resume", {
			locale: "en",
			link: "/resume/Grzegorz_Mozer_Resume_CA.pdf",
		});
	});
});
