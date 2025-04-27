import { sendEmail } from "@/actions/contact";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import messages from "../../messages/en.json";
import { ContactForm } from "./contact-form";

// Set environment variables
process.env.RESEND_API_KEY = "test_key";
process.env.EMAIL_FROM = "test@example.com";
process.env.EMAIL_TO = "test@example.com";

// Mock the server action
vi.mock("@/actions/contact", () => ({
	sendEmail: vi.fn(),
}));

// Mock the toast component
const mockToast = vi.fn();
vi.mock("@/hooks/use-toast", () => ({
	useToast: () => ({
		toast: mockToast,
	}),
}));

const renderWithTranslations = (children: ReactNode) => {
	render(
		<NextIntlClientProvider locale="en" messages={messages}>
			{children}
		</NextIntlClientProvider>,
	);
};

describe("ContactForm", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders all form fields", () => {
		renderWithTranslations(<ContactForm />);

		expect(screen.getByText(/full name/i)).toBeInTheDocument();
		expect(screen.getByText(/email/i)).toBeInTheDocument();
		expect(screen.getByText("Message")).toBeInTheDocument();
		expect(
			screen.getByRole("textbox", { name: /full name/i }),
		).toBeInTheDocument();
		expect(screen.getByRole("textbox", { name: /email/i })).toBeInTheDocument();
		expect(
			screen.getByRole("textbox", { name: "Message" }),
		).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /send message/i }),
		).toBeInTheDocument();
	});

	it("displays validation errors for empty fields", async () => {
		renderWithTranslations(<ContactForm />);

		fireEvent.click(screen.getByRole("button", { name: /send message/i }));

		await waitFor(() => {
			expect(
				screen.getByText(/name must be at least 2 characters/i),
			).toBeInTheDocument();
			expect(screen.getByText(/invalid email address/i)).toBeInTheDocument();
			expect(
				screen.getByText(/message must be at least 10 characters/i),
			).toBeInTheDocument();
		});
	});

	it("submits form with valid data", async () => {
		const mockSendEmail = vi.mocked(sendEmail);
		mockSendEmail.mockResolvedValue({ success: true, error: null });

		renderWithTranslations(<ContactForm />);

		fireEvent.change(screen.getByRole("textbox", { name: /full name/i }), {
			target: { value: "John Doe" },
		});

		fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
			target: { value: "john@example.com" },
		});

		fireEvent.change(screen.getByRole("textbox", { name: "Message" }), {
			target: { value: "This is a test message" },
		});

		fireEvent.click(screen.getByRole("button", { name: /send message/i }));

		await waitFor(() => {
			expect(mockSendEmail).toHaveBeenCalled();
		});
	});

	it("shows success toast on successful submission", async () => {
		const mockSendEmail = vi.mocked(sendEmail);
		mockSendEmail.mockResolvedValue({ success: true, error: null });

		renderWithTranslations(<ContactForm />);

		fireEvent.change(screen.getByRole("textbox", { name: /full name/i }), {
			target: { value: "John Doe" },
		});

		fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
			target: { value: "john@example.com" },
		});

		fireEvent.change(screen.getByRole("textbox", { name: /message/i }), {
			target: { value: "This is a test message" },
		});

		fireEvent.click(screen.getByRole("button", { name: /send message/i }));

		await waitFor(() => {
			expect(mockToast).toHaveBeenCalledWith(
				expect.objectContaining({
					title: "Your message is on the way!",
					variant: "success",
				}),
			);
		});
	});

	it("shows error toast on failed submission", async () => {
		const mockSendEmail = vi.mocked(sendEmail);
		mockSendEmail.mockResolvedValue({
			success: false,
			error: "Failed to send email",
		});

		renderWithTranslations(<ContactForm />);

		fireEvent.change(screen.getByRole("textbox", { name: /full name/i }), {
			target: { value: "John Doe" },
		});

		fireEvent.change(screen.getByRole("textbox", { name: /email/i }), {
			target: { value: "john@example.com" },
		});

		fireEvent.change(screen.getByRole("textbox", { name: /message/i }), {
			target: { value: "This is a test message" },
		});

		fireEvent.click(screen.getByRole("button", { name: /send message/i }));

		await waitFor(() => {
			expect(mockToast).toHaveBeenCalledWith(
				expect.objectContaining({
					title: "Houston we have problem...",
					variant: "destructive",
				}),
			);
		});
	});
});
