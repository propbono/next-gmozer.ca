"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { type ContactFormData, contactFormSchema } from "@/schemas/contact";

export function ContactForm() {
	const [isPending, startTransition] = useTransition();
	const { toast } = useToast();
	const t = useTranslations("contact.form");

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ContactFormData>({
		resolver: zodResolver(contactFormSchema),
	});

	const onSubmit = (data: ContactFormData) => {
		const formData = new FormData();
		for (const [key, value] of Object.entries(data)) {
			formData.append(key, value);
		}

		startTransition(async () => {
			const result = await sendEmail(formData);
			if (result.success) {
				toast({
					title: t("success.title"),
					description: t("success.message"),
					variant: "success",
					duration: 5000,
				});
				reset();
			} else {
				toast({
					title: t("error.title"),
					description: result.error || t("error.message"),
					variant: "destructive",
					duration: 5000,
				});
			}
		});
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
			<Input
				type="text"
				{...register("website")}
				className="hidden"
				tabIndex={-1}
				autoComplete="off"
			/>
			<div>
				<Label htmlFor="fullname">{t("fields.fullName.label")}</Label>
				<Input
					{...register("fullname")}
					id="fullname"
					aria-label={t("fields.fullName.ariaLabel")}
					placeholder={t("fields.fullName.placeholder")}
				/>
				<div className="h-5">
					{errors.fullname && (
						<p className="text-sm text-destructive">
							{t("fields.fullName.error")}
						</p>
					)}
				</div>
			</div>
			<div>
				<Label htmlFor="email">{t("fields.email.label")}</Label>
				<Input
					{...register("email")}
					id="email"
					aria-label={t("fields.email.ariaLabel")}
					placeholder={t("fields.email.placeholder")}
				/>
				<div className="h-5">
					{errors.email && (
						<p className="text-sm text-destructive">
							{t("fields.email.error")}
						</p>
					)}
				</div>
			</div>
			<div>
				<Label htmlFor="message">{t("fields.message.label")}</Label>
				<Textarea
					{...register("message")}
					id="message"
					aria-label={t("fields.message.ariaLabel")}
					placeholder={t("fields.message.placeholder")}
				/>
				<div className="h-5">
					{errors.message && (
						<p className="text-sm text-destructive">
							{t("fields.message.error")}
						</p>
					)}
				</div>
			</div>
			<Button
				variant="default"
				className="uppercase w-full"
				disabled={isPending}
			>
				{isPending ? t("fields.submit.loading") : t("fields.submit.label")}
			</Button>
		</form>
	);
}
