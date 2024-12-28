"use client";

import { sendEmail } from "@/app/(footer)/contact/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type ContactFormData, contactFormSchema } from "@/schemas/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

export function ContactForm() {
  const [isPending, startTransition] = useTransition();

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
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    startTransition(async () => {
      const result = await sendEmail(formData);
      if (result.success) {
        reset();
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <Label>Full Name</Label>
        <Input {...register("fullname")} />
        <div className="h-5">
          {errors.fullname && <p className="text-sm text-destructive">{errors.fullname.message}</p>}
        </div>
      </div>
      <div>
        <Label>Email</Label>
        <Input {...register("email")} />
        <div className="h-5">
          {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
        </div>
      </div>
      <div>
        <Label>Message</Label>
        <Textarea {...register("message")} />
        <div className="h-5">
          {errors.message && <p className="text-sm text-destructive">{errors.message.message}</p>}
        </div>
      </div>
      <Button
        variant="default"
        className="uppercase w-full"
        disabled={isPending}
      >
        {isPending ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
