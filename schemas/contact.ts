import { z } from "zod";

export const contactFormSchema = z.object({
	fullname: z.string().min(2, "Name must be at least 2 characters"),
	email: z.string().email("Invalid email address"),
	message: z.string().min(10, "Message must be at least 10 characters"),
	website: z.string().max(0, "Something went wrong"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
