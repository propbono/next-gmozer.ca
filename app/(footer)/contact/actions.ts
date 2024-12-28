"use server";

import { contactFormSchema } from "@/schemas/contact";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const validatedFields = contactFormSchema.safeParse({
    fullname: formData.get("fullname"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }

  const { fullname, email, message } = validatedFields.data;

  try {
    await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: "propbono@gmail.com",
      subject: `New Contact Form Submission from ${fullname}`,
      text: `
        Name: ${fullname}
        Email: ${email}
        Message: ${message}
      `,
    });
    return { success: true };
  } catch (error) {
    return {
      error: "Failed to send email",
    };
  }
}
