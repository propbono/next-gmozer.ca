"use server";

import { ContactFormEmailTemplate } from "@/components/contact-form-template";
import { contactFormSchema } from "@/schemas/contact";
import { Resend } from "resend";

export async function sendEmail(formData: FormData) {
	const resend = new Resend(process.env.RESEND_API_KEY);

	const validatedFields = contactFormSchema.safeParse({
		fullname: formData.get("fullname"),
		email: formData.get("email"),
		message: formData.get("message"),
		website: formData.get("website"),
	});

	if (!validatedFields.success) {
		let errorMessage = "";
		validatedFields.error.format();
		for (const issue of validatedFields.error.issues){
			errorMessage = `${errorMessage + issue.path[0]}: ${issue.message}. `;	
		}

		return {
			error: errorMessage,
			success: false,
		};
	}

	const { fullname, email, message } = validatedFields.data;

	try {
		if (!(process.env.EMAIL_FROM && process.env.EMAIL_TO)) {
			throw new Error("Email configuration is missing");
		}

		const { error } = await resend.emails.send({
			from: process.env.EMAIL_FROM,
			to: process.env.EMAIL_TO,
			subject: "GMozer.ca - New Contact Form Submission",
			react: ContactFormEmailTemplate({
				fullname,
				email,
				message,
			}) as React.ReactElement,
		});
		if (error) return { error: error.message, success: false };

		return { error: null, success: true };
	} catch (error) {
		return {
			error: error instanceof Error ? error.message : "Failed to send email",
			success: false,
		};
	}
}
