import { fireEvent, render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import { describe, expect, it, vi } from "vitest";
import { usePostHog } from "@/hooks/use-posthog";
import { DownloadResume } from "./resume-download";

// Mock the hook
vi.mock("@/hooks/use-posthog", () => ({
	usePostHog: vi.fn(),
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
	it("captures download_resume event without properties", () => {
		const captureMock = vi.fn();
		vi.mocked(usePostHog).mockReturnValue({
			capture: captureMock,
		} as unknown as ReturnType<typeof usePostHog>);

		render(<DownloadResume text="Resume" />);

		const link = screen.getByRole("link", { name: /resume/i });
		fireEvent.click(link);

		expect(captureMock).toHaveBeenCalledWith("download_resume");
	});
});
