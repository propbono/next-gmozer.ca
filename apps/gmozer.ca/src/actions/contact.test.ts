import { beforeEach, describe, expect, it, vi } from "vitest";
import { sendEmail } from "./contact";

const { mockSend } = vi.hoisted(() => {
	return { mockSend: vi.fn() };
});

vi.mock("resend", () => ({
	// biome-ignore lint/complexity/useArrowFunction: Requesting a standard function for Vitest mock compatibility
	Resend: vi.fn(function () {
		return {
			emails: {
				send: mockSend,
			},
		};
	}),
}));

describe("sendEmail", () => {
	const mockFormData = new FormData();

	beforeEach(() => {
		vi.clearAllMocks();
		mockFormData.set("fullname", "John Doe");
		mockFormData.set("email", "john@example.com");
		mockFormData.set("message", "Test message");
		mockFormData.set("website", "");

		process.env.RESEND_API_KEY = "fake-api-key";
		process.env.EMAIL_FROM = "from@example.com";
		process.env.EMAIL_TO = "to@example.com";
	});

	it("handles Resend API errors", async () => {
		mockSend.mockResolvedValue({ data: null, error: { message: "API Error" } });

		const result = await sendEmail(mockFormData);

		expect(result).toEqual({
			error: "API Error",
			success: false,
		});
	});

	it("validates honeypot field is empty", async () => {
		mockFormData.set("website", "spam-website.com");

		const result = await sendEmail(mockFormData);

		expect(result.success).toBe(false);
		expect(result.error).toContain("Something went wrong");
	});

	it("validates message length requirements", async () => {
		mockFormData.set("message", "hi"); // Too short

		const result = await sendEmail(mockFormData);

		expect(result.success).toBe(false);
		expect(result.error).toContain("Message must be at least 10 characters");
	});

	it("handles unexpected errors during email sending", async () => {
		mockSend.mockRejectedValue(new Error("Network error"));

		const result = await sendEmail(mockFormData);

		expect(result).toEqual({
			error: "Network error",
			success: false,
		});
	});

	it("verifies email template data is passed correctly", async () => {
		mockSend.mockResolvedValue({ data: {}, error: null });

		await sendEmail(mockFormData);

		expect(mockSend).toHaveBeenCalledWith(
			expect.objectContaining({
				subject: "GMozer.ca - New Contact Form Submission",
				from: "from@example.com",
				to: "to@example.com",
				react: expect.any(Object),
			}),
		);
	});

	it("validates invalid email format", async () => {
		mockFormData.set("email", "notanemail");

		const result = await sendEmail(mockFormData);

		expect(result.success).toBe(false);
		expect(result.error).toContain("Invalid email address");
	});

	it("validates too short name", async () => {
		mockFormData.set("fullname", "J");

		const result = await sendEmail(mockFormData);

		expect(result.success).toBe(false);
		expect(result.error).toContain("Name must be at least 2 characters");
	});

	it("validates all empty fields", async () => {
		mockFormData.set("fullname", "");
		mockFormData.set("email", "");
		mockFormData.set("message", "");
		mockFormData.set("website", "");

		const result = await sendEmail(mockFormData);

		expect(result.success).toBe(false);
		expect(result.error).toContain(
			"fullname: Name must be at least 2 characters. email: Invalid email address. message: Message must be at least 10 characters.",
		);
	});

	it("successfully sends email and returns success true", async () => {
		mockSend.mockResolvedValue({ data: {}, error: null });

		const result = await sendEmail(mockFormData);

		expect(mockSend).toHaveBeenCalledTimes(1);
		expect(result).toEqual({
			error: null,
			success: true,
		});
	});
});
