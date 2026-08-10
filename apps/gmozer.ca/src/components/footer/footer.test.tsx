import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import messages from "../../../messages/en.json";
import { Footer } from "./footer";

vi.mock("@/i18n/navigation", () => ({
	usePathname: () => "/",
}));

vi.mock("@/components/socials", () => ({
	Socials: () => <div data-testid="socials" />,
}));

vi.mock("@/components/locale-switcher", () => ({
	LocaleSwitcher: () => <div data-testid="locale-switcher" />,
}));

const renderWithTranslations = (children: ReactNode) => {
	render(
		<NextIntlClientProvider locale="en" messages={messages}>
			{children}
		</NextIntlClientProvider>,
	);
};

describe("Footer", () => {
	beforeEach(() => {
		// Freeze the current year for deterministic testing
		vi.useFakeTimers();
		vi.setSystemTime(new Date("2026-08-10"));
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("renders copyright with dynamic current year", () => {
		renderWithTranslations(<Footer />);

		const currentYear = new Date().getFullYear();
		expect(screen.getByText(/2026 Greg Mozer \| All rights reserved/)).toBeInTheDocument();
	});

	it("renders copyright year matching new Date().getFullYear()", () => {
		renderWithTranslations(<Footer />);

		const currentYear = new Date().getFullYear();
		// Verify the rendered text contains the current year, not hardcoded "2023"
		expect(screen.getByText(new RegExp(`${currentYear} Greg Mozer`))).toBeInTheDocument();
	});

	it("does not render the old hardcoded year 2023", () => {
		renderWithTranslations(<Footer />);

		expect(screen.queryByText(/2023 Greg Mozer/)).not.toBeInTheDocument();
	});
});
